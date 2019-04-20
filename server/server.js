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

app.post('/orders', (req, res) => {
    const {meat, cheese, bacon, salad, price} = req.body;
    db('orders').insert({
        meat: meat,
        cheese: cheese,
        bacon: bacon,
        salad: salad,
        price: price,
        time: new Date()
    })
    .then(response => res.json(response))
    .catch(err => res.status(400).json('error getting orders'));
});

app.get('/ingredients', (req, res) => {
    db.select('*').from('ingredients')
    .then(response => res.json(response))
    .catch(err => res.status(400).json('error getting ingredients'));
});



// Checking...
db.select('*').from('orders')
    .then(data => console.log(data));

app.listen(3000);