//This file is responsible to read from and write into our db.json file
const fs = require('fs');
const util = require('util');

//read file as a promis
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

/*This function reads the data from file then it filters the notes that their id isn't equal to the one that
we want to delete and put all the notes except the one that has deletedId in an array and write this array into the file,
and in this way, it deletes that specific id*/
const readAndDelete = (deletedId, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const dataWithoutDeleteId = parsedData.filter(note => note.id !== deletedId)
      writeToFile(file, dataWithoutDeleteId);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
