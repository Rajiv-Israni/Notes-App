const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
    describe: 'title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
.command('add', 'add new note', {
    title: titleOptions,
    body: bodyOptions
})
.command('list', 'list all notes')
.command('read', 'read note', {
  title: titleOptions
})
.command('remove', 'remove note', {
  title: titleOptions
})
.help()
.argv;
var command = process.argv[2];
console.log(command);
if(command === 'add'){
 var note = notes.addNote(argv.title, argv.body);
 if (note) {
   console.log('Note was added.');
   notes.logNote(note);
 } else {
   console.log('Title already taken!');
 }
} else if(command === 'remove'){
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed.' : 'Note not found!';
  console.log(message);
} else if(command === 'read'){
  var note = notes.readNote(argv.title);
  if (note) {
    console.log('Note is.');
    notes.logNote(note);
  }
  else {
    console.log('Note not found!');
  }
} else if(command === 'list'){
  var allNotes = notes.listNote();
  console.log(`Listing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else {
  console.log('command not recognized!');
}
