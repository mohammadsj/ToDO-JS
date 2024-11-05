document.addEventListener("DOMContentLoaded", loadTasks())


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
    tasks.forEach(taskText => displayTask(taskText));
}


function displayTask(taskText) {
    const todoList = document.getElementById('todo-list')
    const li = document.createElement('li')
    li.textContent = taskText
    li.classList.add("todo-item");

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'حذف تسک'
    deleteBtn.classList.add('delete-btn')
    deleteBtn.onclick = () => deleteTask(taskText, li)

    li.appendChild(deleteBtn)
    todoList.appendChild(li)
}


function deleteTask(taskText, taskElement) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || "[]")
    tasks = tasks.filter(task => task !== taskText)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    taskElement.remove()
}

function addTodo() {
    const input = document.getElementById('todo-input')
    const taskText = input.value.trim()
    if (taskText === '') return

    let tasks = JSON.parse(localStorage.getItem('tasks') || "[]")
    tasks.push(taskText)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    displayTask(taskText)
    input.value = ''
}


function searchTasks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase()
    const todoItems = document.querySelectorAll('.todo-item')

    todoItems.forEach(item => {
        const taskText = item.firstChild.textContent.toLowerCase()
        if (taskText.includes(searchInput)) {
            item.style.display = ''
        } else {
            item.style.display = 'none'
        }
    })
}