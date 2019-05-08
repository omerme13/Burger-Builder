const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt');

const orders = require('./controllers/orders');
const register = require('./controllers/register');
const ingredients = require('./controllers/ingredients').initialIngredients;

// linux: user = omer, password = 1234
// windows: user = postgres, password = '' 
let user = 'omer';
let password = '1234';
if (process.platform === 'win32') {
    user = 'postgres';
    password = '';  
}    

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: user,
        password: password,
        database: 'burgerbuilder'
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/ingredients', (req, res) => {
    res.send(ingredients)
});

app.post('/orders', (req, res) => {
    orders.orderHandler(req, res, db);
});

app.get('/orders', (req, res) => {
    db.select('*').from('orders')
        .then(response => res.json(response))
        .catch(err => res.status(400).json('error getting orders'));
});

app.post('/register', (req, res) => {
    register.registerHandler(req, res, db, bcrypt);
});

app.listen(3000);