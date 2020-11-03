// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todoJSON = localStorage.getItem('todos')
    if(todoJSON !== null)
        return JSON.parse(todoJSON)
    else
        return []
}

// Save todos to localStorage
const saveTodos = function(todos) {
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function(todo , filters) {
    const filteredText = todo.filter(function(todo){
        if(!filters.hideCompleted)
            return todo.text.toLowerCase().includes(filters.text.toLowerCase())
        else
            return todo.text.toLowerCase().includes(filters.text.toLowerCase()) && !todo.completed
    })
    
    document.querySelector('#todos').innerHTML = ''

    let incompleteTodos = 0
    for (let i = 0; i < filteredText.length; i++) 
        if(filteredText[i].completed === false)
            incompleteTodos++
    
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredText.forEach(function(todo){
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Remove todos
const removeTodos = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })

    if (todoIndex > -1)
        todos.splice(todoIndex,1)
}

//Toggle todos
const toggleTodo = function(id) {
    const todo = todos.find(function(todo){
        return todo.id === id
    })
    if(todo !== undefined)
        todo.completed = !todo.completed
}

//Get the DOM elements for a indivisual note
const generateTodoDOM = function(todo){
    const div = document.createElement('div')
    const checkbox = document.createElement('input')
    const p = document.createElement('span')
    const button = document.createElement('button')

    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    div.appendChild(checkbox)

    p.textContent = todo.text
    div.appendChild(p)

    button.textContent = 'x'
    div.appendChild(button)

    button.addEventListener('click',function(){
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    checkbox.addEventListener('click',function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    
    return div
}

//Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos){
    const summary = document.createElement('h1')
    summary.textContent = `You have ${incompleteTodos} todos left`
    return summary
}