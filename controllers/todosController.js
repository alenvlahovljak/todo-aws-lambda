const date = require('../utils/date');

const todosAPI = require('../api/todos')

module.exports.getTodos = async (req, res) => {
    let newListItems;
    const day = date.getDate();

    try {
        const {data} = await todosAPI.getTodos();
        newListItems = data.results;
    } catch (e) {
        newListItems = []
    }

    res.render("list", {listTitle: day, newListItems});
}

module.exports.createTodo = async (req, res) => {
    console.log('halo')
    const {newItem} = req.body;

    const day = date.getDate();

    let list = [];

    try {
        const {data} = await todosAPI.createTodo(newItem);
        list = data.results;
    } catch (e) {
        console.log(e);
    }

    res.render("list", {listTitle: day, newListItems: list});
}

module.exports.deleteTodo = async (req, res) => {
    try {
        await todosAPI.deleteTodo(req.params.id);
    } catch (e) {
        console.log(e);
    }

    res.redirect('/');
}
