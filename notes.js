const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var saveNote = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNote(notes);
    return note;
  }
};
var removeNote = (title) => {
  var notes = fetchNotes();
  // filter note which we want to delete
  var removeNotes = notes.filter((note) => note.title !== title);
  // saves new notes array
  saveNote(removeNotes);

  return notes.length !== removeNotes.length;
};
var readNote = (title) => {
  var notes = fetchNotes();
  // filter note which we want to read
  var toRead = notes.filter((note) => note.title === title);
  // return note to read
  return toRead[0];
};
var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}
var listNote = () => {
  return fetchNotes();
};
module.exports = {
  addNote,
  removeNote,
  readNote,
  listNote,
  logNote
};
