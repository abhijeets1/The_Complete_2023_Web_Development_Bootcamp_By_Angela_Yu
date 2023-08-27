const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get('contact', (req, res) => {
    res.send("<h1>abhishahakar@gmail.com</h1>");
});

app.get('/about', (req, res) => {
    res.send("<h1>Abhijeet Shahakar</h1>");
});

app.listen(3000, () => {
    console.log("Server started on: 3000");
});