`use strict`;

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.json(users);

});

app.post('/users', async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(salt);
        console.log(hashedPassword)
        const user = {
            name: req.body.name,
            password: req.body.password
        }
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }

});

app.post('/users/login', async (req, res) => {

    const user = users.find(user => user.name = req.body.name);
    if (user == null) return res.status(400).send('Cannot find the user');
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Error! Please check your username and password')
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT);
});