const db = require('./bootstrap/db');
const hbs = require('hbs');
const express = require('express');
const bodyparser = require('body-parser');

const produkt= require('./models/produkts');
var app = express();
app.use(bodyparser.urlencoded({ extended: false}));
// app.use(bodyparser.json());
app.set('view engine', 'hbs');
app.use(express.static('public'));
db.initDB();

app.get('/', produkt.reader);
app.post('/insert', produkt.creator);
app.post('/delete', produkt.deleter);
app.post('/update', produkt.updater);

app.listen(8080)

