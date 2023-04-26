const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
});

notes.post('/', (req, res) => {
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    }
    readAndAppend(newNote, './db/db.json');
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
});

notes.delete('/:id', (req, res) => {
    const {id} = req.params;
 //   console.log(id)
    readAndDelete(id, './db/db.json');
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
});

module.exports = notes;