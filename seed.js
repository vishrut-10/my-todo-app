var statusEnums = {
    active : "active",
    complete : "complete",
    delete : "delete"
};

var todoList = {
    1 : {title : "Learn JavaScript", status : statusEnums.complete},
    2 : {title : "Do Assignment on API", status : statusEnums.active},
    3 : {title : "Make Front End of API", status : statusEnums.active},
    4 : {title : "Learn CSS", status : statusEnums.delete}
};

var nextTodoID = 5;

module.exports = {
    statusEnums : statusEnums,
    todoList : todoList,
    nextTodoId : nextTodoID
};