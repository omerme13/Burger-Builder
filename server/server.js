const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'omer',
        password: '',
        database: 'burgerbuilder'
    }
});

db.select('*').from('orders')
    .then(data => console.log(data))

const app = express();

app.post('/orders', (req, res) => {
    db('orders').insert({
        meat: 2,
        cheese: 2,
        bacon: 1,
        salad: 1
    })
    .then(order => console.log(order))
})

app.post('/', (req, res) => {
    const order = {
        meat: 2,
        cheese: 2,
        bacon: 1,
        salad: 1
    }
    res.json(order);
})

app.listen(3000);