const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');

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

// SETUP
const initialIngredients = {
    salad: 0, 
    meat: 0, 
    cheese: 0, 
    bacon: 0 
}

const prices = {
    meat: 1.3, 
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    default: 4
}

app.post('/orders', (req, res) => {
    const {
        meat, cheese, bacon, salad, 
        name, city, street, email, deliveryMethod
    } = req.body;

    db('orders').insert({
        meat: meat,
        cheese: cheese,
        bacon: bacon,
        salad: salad,
        // the reason for calculating prices here is to prevent manipulating data by the user.
        price: prices.default + prices.salad*salad + prices.bacon*bacon
            + prices.cheese*cheese + prices.meat*meat,
        // TODO userId: userId .and then connect user table with orders table instead of creating many columns in orders table
        name: name.value,
        city: city.value,
        street: street.value,
        email: email.value,
        deliveryMethod: deliveryMethod.value,
        time: new Date()
    })
    .then(response => res.json(response))
    .catch(err => res.status(400).json('error getting orders'));
});

app.get('/ingredients', (req, res) => {
    res.send(initialIngredients)
});

app.get('/orders', (req, res) => {
    db.select('*').from('orders')
    .then(response => res.json(response))
    .catch(err => res.status(400).json('error getting orders'));
});

// app.post('/register', (req, res) => {
//     const {email, password} = req.body;
//     db('users').insert({
//         email: email,
//         password: password
//     })
//     /then(response => res.json(response))
//     .catch(err => res.status(400).json('error registering'))
// });



// Checking...
// db.select('*').from('ingredients')
//     .then(data => console.log(data));

app.listen(3000);