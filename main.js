// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

const deleteAllButton = document.querySelector('.delete-all-button')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

deleteAllButton.addEventListener('click', deleteAll)


// Functions

// Anything added here must also be added to getTodos() for local storage
function addTodo(event) {
    event.preventDefault();

    if(todoInput.value === null || todoInput.value === "") {
        
    }
    else {
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create main todo container
        const todoMainContainer = document.createElement('div');
        todoMainContainer.classList.add("todo-main-container");
        // Checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-regular fa-circle"></i>'
        completedButton.classList.add("complete-btn");
        todoMainContainer.appendChild(completedButton);
        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoMainContainer.appendChild(newTodo);
        // Bin button
        const binButton = document.createElement('button');
        binButton.innerHTML = '<i class="fas fa-trash"></i>'
        binButton.classList.add("bin-btn");
        todoMainContainer.appendChild(binButton);
        //Add main todo container to todoDiv
        todoDiv.appendChild(todoMainContainer)

        // Date due container
        const dueContainer = document.createElement('div');
        dueContainer.classList.add("due-container");
        // Date input
        dueContainer.innerHTML = '<input type="date" class="due-date-input" name="due">'
        // Due confirm
        const dueButton = document.createElement('button');
        dueButton.innerHTML = '<i class="fa-regular fa-square-check"></i>'
        dueButton.classList.add("due-btn");
        dueContainer.appendChild(dueButton);
        //Add due container to todoDiv
        todoDiv.appendChild(dueContainer)

        // Add todo to local storage
        saveLocalTodos(todoInput.value, "uncompleted", null);

        // Append to todo list
        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
}

// Functions of the delete and complete buttons
function deleteCheck(e) {
    //console.log(e.target);
    const item = e.target;
    // Bin button functionality
    if (item.classList[0] === 'bin-btn') {
        const todo = item.parentElement.parentElement;
        
        todo.classList.add("slide-out");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Complete button functionality
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");

        if (todo.classList.contains("completed")) {
            item.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            updateLocalTodo(todo.childNodes[1].innerText,"completed");
        }
        else {
            item.innerHTML = '<i class="fa-regular fa-circle"></i>';
            updateLocalTodo(todo.childNodes[1].innerText,"uncompleted");
        }
        
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
            switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.childNodes[0].classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.childNodes[0].classList.contains('completed')){
                    todo.style.display = 'none';
                }
                else{
                    todo.style.display = "flex";
                }
                break;
        }
    }) 
}

function saveLocalTodos(todo, isComplete, dateDue) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push([todo, isComplete, dateDue]);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Uses the todo text to find the index of a todo in local storage
function findTodoIndex(todoText) {
    localTodos = JSON.parse(localStorage.getItem('todos'));

    for (var i=0; i <= localTodos.length -1; i++) {
        if (localTodos[i][0] == todoText) {
            return i
        }
    }
}

// Updates the todos array in local storage to state whether a today is completed
function updateLocalTodo(todoText, isComplete) {
    todos = JSON.parse(localStorage.getItem('todos'));

    index = findTodoIndex(todoText);
    //Object.assign([], todos, {index: [todoText, isComplete, null]});
    todos[index][1] = isComplete;
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create main todo container
        const todoMainContainer = document.createElement('div');
        todoMainContainer.classList.add("todo-main-container");
        //Retrieves information from todos to apply the completed class if necessary
        if (todo[1] != "uncompleted") {
            todoMainContainer.classList.toggle("completed");
        }
        // Checkmark button
        const completedButton = document.createElement('button');
        if (todoMainContainer.classList[1] === "completed") {
            completedButton.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
        }
        else {
            completedButton.innerHTML = '<i class="fa-regular fa-circle"></i>';
        }  
        completedButton.classList.add("complete-btn");
        todoMainContainer.appendChild(completedButton);
        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo[0];
        newTodo.classList.add('todo-item');
        todoMainContainer.appendChild(newTodo);
        // Bin button
        const binButton = document.createElement('button');
        binButton.innerHTML = '<i class="fas fa-trash"></i>'
        binButton.classList.add("bin-btn");
        todoMainContainer.appendChild(binButton);
        //Add main todo container to todoDiv
        todoDiv.appendChild(todoMainContainer)

        // Date due container
        const dueContainer = document.createElement('div');
        dueContainer.classList.add("due-container");
        // Date input
        dueContainer.innerHTML = '<input type="date" class="due-date-input" name="due">'
        // Due confirm
        const dueButton = document.createElement('button');
        dueButton.innerHTML = '<i class="fa-regular fa-square-check"></i>'
        dueButton.classList.add("due-btn");
        dueContainer.appendChild(dueButton);
        //Add due container to todoDiv
        todoDiv.appendChild(dueContainer)

        // Append to todo list
        todoList.appendChild(todoDiv);
        todoInput.value = "";



    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    index = findTodoIndex(todo.children[0].innerText);
    console.log("todos",todos);
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAll() {
    const todos = document.querySelector('.todo-list')

    while (todos.lastElementChild) {
        todos.removeChild(todos.lastElementChild)
    }
    localStorage.removeItem('todos');
}
