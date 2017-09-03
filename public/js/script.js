const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const ACTIVE_TODO_DIV_ID = "active_todos_div";
const COMPLETED_TODO_DIV_ID = "completed_todos_div";
const DELETED_TODO_DIV_ID = "deleted_todos_div";
const NEW_TODO = "add_new_todo";

// on loading the window call the function getTodoAJAX()
window.onload = getTodoAJAX();

/*
    this function deletes the element from todo list
    of respective id.
 */
function addDeletedTodoAJAX(id)
{
    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    data = "status=delete";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == RESPONSE_DONE && xhr.status == STATUS_OK) {
            addDeletedTodoElements(DELETED_TODO_DIV_ID, xhr.responseText);
            addActiveTodoElements(ACTIVE_TODO_DIV_ID, xhr.responseText);
            addCompletedTodoElements(COMPLETED_TODO_DIV_ID, xhr.responseText);
            console.log(xhr.responseText);
        }
    }

    xhr.send(data);
}

/*
    this function marks as complete
    an element of todo list.
 */

function addCompletedTodoAJAX(id)
{
    var xhr = new XMLHttpRequest();

    xhr.open("PUT", "/api/todos/complete/"+id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    data = "status=complete";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == RESPONSE_DONE && xhr.status == STATUS_OK) {
            addDeletedTodoElements(DELETED_TODO_DIV_ID, xhr.responseText);
            addActiveTodoElements(ACTIVE_TODO_DIV_ID, xhr.responseText);
            addCompletedTodoElements(COMPLETED_TODO_DIV_ID, xhr.responseText);
            console.log(xhr.responseText);
        }
    }

    xhr.send(data);
}

/*
    this function mark as active an element present in the completed task
    of an todo list.
 */

function addActiveTodoAJAX(id)
{
    var xhr = new XMLHttpRequest();

    xhr.open("PUT", "/api/todos/active/"+id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    data = "status=active";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == RESPONSE_DONE && xhr.status == STATUS_OK) {
            addDeletedTodoElements(DELETED_TODO_DIV_ID, xhr.responseText);
            addActiveTodoElements(ACTIVE_TODO_DIV_ID, xhr.responseText);
            addCompletedTodoElements(COMPLETED_TODO_DIV_ID, xhr.responseText);
            console.log(xhr.responseText);
        }
    }

    xhr.send(data);
}

/*
    this function creates new todo element
    & adds it in it's respective status field.
 */

function createTodoElement(key, todoObject)
{
    var todoElement = document.createElement("div");

    todoElement.innerText = todoObject.title;
    todoElement.setAttribute("data-id", key);

    if (todoObject.status != "delete") {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox_id";
        checkbox.value = "";

        if (todoObject.status == "active") {
            checkbox.setAttribute("onchange", "addCompletedTodoAJAX("+key+")");
        } else if (todoObject.status == "complete") {
            checkbox.setAttribute("onchange", "addActiveTodoAJAX("+key+")");
        }

        var button = document.createElement("input");
        button.type = "button";
        button.id = "button_id";
        button.value = "X";
        button.setAttribute("onclick", "addDeletedTodoAJAX("+key+")");

        todoElement.appendChild(checkbox);
        todoElement.appendChild(button);
    }

    return todoElement;
}

/*
    this function adds a todo element
    in active status field.
 */

function addActiveTodoElements(id, data)
{
    var todos = JSON.parse(data);
    var parent = document.getElementById(id);

    parent.innerHTML = "";

    if (parent != null) {
        Object.keys(todos).forEach(function (key) {
            if (todos[key].status == "active") {
                var todoElement = createTodoElement(key, todos[key]);
                parent.appendChild(todoElement);
            }
        });
    }
}

/*
    this function adds a todo element
    in completed status field.
 */

function addCompletedTodoElements(id, data)
{
    var todos = JSON.parse(data);
    var parent = document.getElementById(id);

    parent.innerHTML = "";

    if (parent != null) {
        Object.keys(todos).forEach(function (key) {
            if (todos[key].status == "complete") {
                var todoElement = createTodoElement(key, todos[key]);
                parent.appendChild(todoElement);
            }
        });
    }
}

/*
    this function adds a todo element
    in deleted status field.
 */

function addDeletedTodoElements(id, data)
{
    var todos = JSON.parse(data);
    var parent = document.getElementById(id);

    parent.innerHTML = "";

    if (parent != null) {
        Object.keys(todos).forEach(function (key) {
            if (todos[key].status == "delete") {
                var todoElement = createTodoElement(key, todos[key]);
                parent.appendChild(todoElement);
            }
        });
    }
}

/*
    this function adds a new todo element
    with default status active.
 */

function addTodoAJAX()
{
    var title = document.getElementById(NEW_TODO).value;
    var xhr = new XMLHttpRequest();
    var data = "title=" + encodeURI(title);

    xhr.open("POST", "/api/todos");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == RESPONSE_DONE && xhr.status == STATUS_OK) {
            addActiveTodoElements(ACTIVE_TODO_DIV_ID, xhr.responseText);
        } else {
            console.log(xhr.responseText);
        }
    }

    xhr.send(data);
    document.getElementById(NEW_TODO).value = "";
}

/*
    driver function of the program.
 */

function getTodoAJAX()
{
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == RESPONSE_DONE && xhr.status == STATUS_OK) {
            addActiveTodoElements(ACTIVE_TODO_DIV_ID, xhr.responseText);
            addCompletedTodoElements(COMPLETED_TODO_DIV_ID, xhr.responseText);
            addDeletedTodoElements(DELETED_TODO_DIV_ID, xhr.responseText);
        }
    }

    xhr.send(data = null);
}

/*
    this function manages the hide property
    of the completed section of todo list.
 */

function hideCompletedTodo()
{
    var id = document.getElementById(COMPLETED_TODO_DIV_ID);
    id.style.display = 'none';
}

/*
    this function manages the show property
    of the completed section of todo list.
 */

function showCompletedTodo()
{
    var id = document.getElementById(COMPLETED_TODO_DIV_ID);
    id.style.display = 'block';
}

/*
    this function manages the hide property
    of the deleted section of todo list.
 */

function hideDeletedTodo()
{
    var id = document.getElementById(DELETED_TODO_DIV_ID);
    id.style.display = 'none';
}

/*
    this function manages the show property
    of the deleted section of todo list.
 */

function showDeletedTodo()
{
    var id = document.getElementById(DELETED_TODO_DIV_ID);
    id.style.display = 'block';
}