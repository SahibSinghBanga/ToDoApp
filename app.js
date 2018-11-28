const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe : "Title of note",
    demand : true,
    alias : 't'
}


const bodyOptions = {
    describe : "Body of note",
    demand : true,
    alias : 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title : titleOptions,
        body : bodyOptions
    })
    .command('list', "List all notes")
    .command('read', "Read a note", {
        title : titleOptions 
    })
    .command('remove', "Remove a note",{
        title : titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if(command === 'add'){
   var note = notes.addNote(argv.title, argv.body);
   if(note) {
     
    console.log("Note is created");
    notes.logNote(note);
    console.log(note);
   } else {
    console.log("Note title taken!");
   }

} else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)!`);
    allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);

} else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log("Note Found");
        notes.logNote(note);
    } else {
        console.log("Note not found");
    }
} else{ 
    console.log("Invalid Commnd");
}









/* Commands for terminal :

1
    1. add - to add new note give title and body
    2. remove - to delete a existing note give a title 
    3. read - to read a note give its title
    4. list - to list all saved notes just type list

*?


/* Used Code : 
    
    var res = notes.addNote();
    console.log(res);

    console.log("Result : ", notes.add(5, 2));

    var user = os.userInfo();
    fs.appendFileSync("greetings.txt", `Hello ${user.username} Your age is ${notes.age}`);

    var filteredArray = _.uniq(['sahib', 1, 'sahib', 1,2,3,4,5]);
    console.log(filteredArray);

    console.log(_.isString(true));
    console.log(_.isString('Sahib'));

    module.exports.add = (a, b) => {
    return a+b;
    };

    console.log("Process", process.argv);
    console.log("Yargs ", argv);

*/
     


/* Notes :

   New ES6 Feature : 
   1. "Hello " + user.username + "!" === `Hello ${user.username} !`
   
   2. After the v6 i.e v7, v8 Sync is added in fs.append()
   
   3. ShortHand Code : 
            var add = notes.add(2,-3); 
            console.log(add);  === console.log("Result : ", notes.add(5, 2));

*/    
 
/* Modules : 

    1. fs : To append => fs.appendSync("FileNameToBeCreated/Updated", "ContentWantToBeAdded");
    2. os : Info of sys user => os.userInfo();
    3. lodash : To check isString => _.isString('Sahib') : it returns true
              : Remove duplicates => _.uniq(['sahib', 1, 'sahib', 1,2,3,4,5])
*/