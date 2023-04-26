const notes = require('express').Router();


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
});

module.exports = notes;