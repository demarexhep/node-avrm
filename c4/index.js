const express = require('express');
var hbs = require('hbs');
const bodyParser = require('body-parser');
const handlers = require('./handlers/students');



const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.set('view engine', 'hbs');

//GET
app.get('/students', handlers.getStudents);

//POST
app.post('/add', handlers.postStudents);

//Edit a student by ID
app.post('/edit', handlers.editStudents);

//Delete s students
app.post('/students', handlers.deleteStudents);


app.listen(8080);