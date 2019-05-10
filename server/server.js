const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    console.log('axios works')
});

app.get('/orders', (req, res) => {
    db.select('*').from('orders')
        .then(response => res.json(response))
        .catch(err => res.status(400).json('error getting orders'));
});

app.post('/register', (req, res) => {
    register.registerHandler(req, res, db, bcrypt);
});

/* ********  TEST ******** */

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

app.post('/test', (req, res) => {
    res.json(`it's working`);
});

app.post('/test/signin', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Working all right...',
                data: authData
            });
            console.log('signin worked!!!')
        }
    });
});

const appUser = {
    name: 'omer',
    email: 'omer@omer.com'
};

app.post('/test/register', (req, res) => {
    jwt.sign({user: appUser}, 'secret', (err, token) => {
        res.json({
            token: token,
            user: appUser
        });
    })
});

/* ********   ******** */

app.listen(3000);