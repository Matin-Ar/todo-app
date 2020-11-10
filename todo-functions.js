'use strict'

// Fetch existing todos from localStorage
const getSavedTodos =  () => {
    const todoJSON = localStorage.getItem('todos')

    try{
        return todoJSON ?  JSON.parse(todoJSON) : []
    } catch(e){
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = (todo , filters) => {
    const filteredText = todo.filter((todo) => {
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

    filteredText.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Remove todos
const removeTodos = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1)
        todos.splice(todoIndex,1)
}

//Toggle todos
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if(todo)
        todo.completed = !todo.completed
}

//Get the DOM elements for a indivisual note
const generateTodoDOM = (todo) => {
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

    button.addEventListener('click',() => {
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    checkbox.addEventListener('click',() => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    
    return div
}

//Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h1')
    summary.textContent = `You have ${incompleteTodos} todos left`
    return summary
}