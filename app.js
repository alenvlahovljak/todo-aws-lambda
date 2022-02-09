if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const PORT = process.env.PORT || 3000

const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use('/', todoRoutes);

app.listen(PORT, function () {
    console.log(`Server has started on port ${PORT}`);
});
