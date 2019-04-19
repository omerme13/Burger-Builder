/* linux: user = omer, password = 1234
    windows: user = postgres, password = '' */


const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'burgerbuilder'
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/orders', (req, res) => {
    const {meat, cheese, bacon, salad} = req.body;
    db('orders').insert({
        meat: meat,
        cheese: cheese,
        bacon: bacon,
        salad: salad,
        time: new Date()
    })
    .then(response => res.json(response));
    
});

// Checking...
db.select('*').from('orders')
    .then(data => console.log(data));

app.listen(3000);