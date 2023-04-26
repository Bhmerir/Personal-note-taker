const miniApp = require('express').Router(); 

const notesRouter = require('./notes');
miniApp.use('/notes', notesRouter);

module.exports = miniApp;