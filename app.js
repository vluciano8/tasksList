// Define UI forms
const form = document.querySelector('#task-form');
const taskList = document.querySelector ('.collection');
const clearBtn = document. querySelector ('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// function all event listeners

function loadEventListeners (){
// DOM load event
document.addEventListener('DOMContentLoaded', getTasks);
// add task event
form.addEventListener('submit', addTask);
// remove task event
taskList.addEventListener('click', removeTask);
// clear tasks event
clearBtn.addEventListener('click', clearTasks);
// filter tasks event
filter.addEventListener ('keyup', filterTasks);


};

// get tasks from LocalStorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
// create li element
const li = document.createElement('li');
// add class
li.className = 'collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(task));
// create new link element
const link = document.createElement ('a');
link.className = 'delete-item secondary-content';
// add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
// append the link to li
li.appendChild(link); 

// append the li to ul
taskList.appendChild(li);
    });
}

// add task function
function addTask(e) {
    if (taskInput.value === ''){
        alert ('add a task');
    }

// create li element
const li = document.createElement('li');
// add class
li.className = 'collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
// create new link element
const link = document.createElement ('a');
link.className = 'delete-item secondary-content';
// add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
// append the link to li
li.appendChild(link); 

// append the li to ul
taskList.appendChild(li);

// store in Local Storage
storeTaskInLocalStorage(taskInput.value);

// clear input
taskInput.value = '';
e.preventDefault();
}

// store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('are you sure??')){
            e.target.parentElement.parentElement.remove();
            // remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    
    }
}
// function remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clearTasks function
function clearTasks(){
    // 2 options
    // option a) taskList.innerHTML = '';
    // option b) Faster!! while loop
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from Local Storage
    clearTasksFromLocalStorage();
}
// function clear tasks from Local Storage

function clearTasksFromLocalStorage(){
    localStorage.clear();
};

// filterTasks function

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !=-1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
};
