let todos = getSavedTodos()

const filters = {
    text: '' ,
    hideCompleted: false 
}

renderTodos(todos,filters)

document.querySelector('#search-text').addEventListener('input',(e) => {
    filters.text = e.target.value
    renderTodos(todos,filters)
})

document.querySelector('#name-form').addEventListener('submit',(e) => {
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        text: e.target.elements.todoName.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos,filters)
    e.target.elements.todoName.value = ''
})

document.querySelector('#hide-completed').addEventListener('change',(e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
})