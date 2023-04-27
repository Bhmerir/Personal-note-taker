const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    }).catch(error=>{
        /*If there was not any db.json file , it makes one and put an empty array inside it, and if the file exists
        but it is empty, it adds an empty array to it. Then we can push our notes inside that array*/
        writeToFile('./db/db.json', []);
    })
});

// Post Route for writing new notes and updating the existing note
notes.post('/', (req, res) => {
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    }
    //This function reads our array from db.json file and push a new note in it and write this changed array in our file
    readAndAppend(newNote, './db/db.json');
    //Then we read again the file and send it back to the client in order to be shown in page
    readFromFile('./db/db.json').then((data) => {
         res.json(JSON.parse(data))
    })
});

notes.delete('/:id', (req, res) => {
    const {id} = req.params;
    readAndDelete(id, './db/db.json');
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
});

module.exports = notes;