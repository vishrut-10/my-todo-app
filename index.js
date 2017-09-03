var express = require("express");
var bodyParser = require("body-parser");
var todo = require("./seed.js");
var app = express();

var todoList = todo.todoList;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/public"));

// 1. Shows all elements of todoList

app.get("/api/todos", function (req, res) {
    res.json(todoList);
});

// 2. Add new element in todoList

app.post("/api/todos", function (req, res) {
    var todoTitle = req.body.title;

    if (todoTitle == "" || todoTitle == null) {
        res.status(400).json("todo-title can not be empty");
        console.log("400, todo-title can not be empty");
    } else {
        var newTodo = {
            title : todoTitle.trim(),
            status : todo.statusEnums.active
        };

        todoList[todo.nextTodoId] = newTodo;
        todo.nextTodoId++;
        res.json(todoList);
        console.log("New todo Added");
        console.log(todoList);
    }
});

// 3. Modify an element in todoList

app.put("/api/todos/:id", function (req, res) {
    var id = req.params.id;
    var modifiedTodo = todoList[id];

    if (modifiedTodo == null) {
        res.status(400).json("Todo can't be modified that does not exist");
        console.log("400, Todo can't be modified that does not exist");
    } else {
        var todoTitle = req.body.title;

        if (todoTitle.trim() == "" || todoTitle == null) {
            res.status(400).json("todo-title can not be empty");
            console.log("400, todo-title can not be empty");
        } else {
            modifiedTodo.title = todoTitle.trim();
            res.json(todoList);
            console.log("Todo Modified");
            console.log(todoList);
        }
    }
});

// 4. Delete an element of todoList

app.delete("/api/todos/:id", function(req, res) {
    var id = req.params.id;
    var modifiedTodo = todoList[id];
    console.log();

    if (modifiedTodo == null) {
        res.status(400).json("Todo can't be deleted that does not exist");
        console.log("400, Todo can't be deleted that does not exist");
    } else {
        modifiedTodo.status = "delete";
        res.json(todoList);
        console.log("Todo Deleted");
        console.log(todoList);
    }
});

// 5. Retrieve all active todo's

app.get("/api/todos/active", function (req, res) {
    var obj = new Object();

    for (var i = 1; i < todo.nextTodoId; i++) {
        if (todoList[i].status == "active") {
            //console.log(todoList[i]);
            obj[i] = todoList[i];
        }
    }

    res.json(obj);
    console.log(obj);
});

// 6. Retrieve all completed todo's

app.get("/api/todos/completed", function (req, res) {
    var obj = new Object();

    for (var i = 1; i < todo.nextTodoId; i++) {
        if (todoList[i].status == "complete") {
            //console.log(todoList[i]);
            obj[i] = todoList[i];
        }
    }

    res.json(obj);
    console.log(obj);
});

// 7. Retrieve all deleted todo's

app.get("/api/todos/deleted", function (req, res) {
    var obj = new Object();

    for (var i = 1; i < todo.nextTodoId; i++) {
        if (todoList[i].status == "delete") {
            //console.log(todoList[i]);
            obj[i] = todoList[i];
        }
    }

    res.json(obj);
    console.log(obj);
});

// 8. mark a todo as complete

app.put("/api/todos/complete/:id", function (req, res) {
   var id = req.params.id;
   var modifiedTodo = todoList[id];

   if (modifiedTodo == null) {
       console.log("400, Todo can't be completed that does not exist");
       res.status(400).json("Todo can't be deleted that does not exist");
   } else {
       modifiedTodo.status = "complete";
       console.log("Status changed to complete");
       res.json(todoList);
   }
});

// 9. mark a todo as active

app.put("/api/todos/active/:id", function (req, res) {
    var id = req.params.id;
    var modifiedTodo = todoList[id];

    if (modifiedTodo == null) {
        console.log("400, Todo can't be completed that does not exist");
        res.status(400).json("Todo can't be deleted that does not exist");
    } else {
        modifiedTodo.status = "active";
        console.log("Status changed to complete");
        res.json(todoList);
    }
});

// App listen at port 1337

app.listen(1337, function () {
   console.log("Server Listening at Port 1337");
});