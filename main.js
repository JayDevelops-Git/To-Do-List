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

function addTodo(event) {
    event.preventDefault();
    
    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-regular fa-circle"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

     //Bin button
     const binButton = document.createElement('button');
     binButton.innerHTML = '<i class="fas fa-trash"></i>'
     binButton.classList.add("bin-btn");
     todoDiv.appendChild(binButton);

     //Append to list
     todoList.appendChild(todoDiv);
     todoInput.value = "";
}

function deleteCheck(e) {
    // prints what was clicked: console.log(e.target);
    const item = e.target;
    if (item.classList[0] === 'bin-btn') {
        const todo = item.parentElement;
        
        todo.classList.add("slide-out");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        
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
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }
                else{
                    todo.style.display = "flex";
                }
                break;
        }
    }) 
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
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

        //Checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-regular fa-circle"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
         //Bin button
         const binButton = document.createElement('button');
         binButton.innerHTML = '<i class="fas fa-trash"></i>'
         binButton.classList.add("bin-btn");
         todoDiv.appendChild(binButton);
    
         //Append to list
         todoList.appendChild(todoDiv);
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

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos));

}

function deleteAll() {
    console.log("button pressed - remove all")
    const todos = document.querySelector('.todo-list')

    while (todos.lastElementChild) {
        todos.removeChild(todos.lastElementChild)
    }
    removeAllLocalTodos();
    
}

function removeAllLocalTodos() {
    localStorage.removeItem('todos');
}