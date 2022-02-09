const client = require('./client')

module.exports = {
    getTodos: async () => client.get('/'),
    createTodo: async (name) => client.post('/', {name}),
    deleteTodo: async (id) => client.delete('/', {data: {id}}),
}
