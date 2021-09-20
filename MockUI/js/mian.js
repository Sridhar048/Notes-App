
//import NotesAPI from "./NotesAPI.js"

// NotesAPI.saveNote({
//     id: 499984,
//     title: "Changed or updated one!",
//     body: "Updated Succesdsfully."
// });

//NotesAPI.deleteNode(247941);
// console.log(NotesAPI.getAllNotes());
//import NotesView from "./NotesView.js"


// const app = document.getElementById("app");
// const view = new NotesView(app, {
//     noteAdd(){
//         console.log("Add button clicked!");
//     },

//     noteSelect(id){
//         console.log("Clicked on "+id);
//     },

//     noteDelete(id){
//         console.log("Note Deleted" + id);
//     },

//     noteEdit(newTitle, newBody, newTime){
//         console.log(newTitle);
//         console.log(newBody);
//         console.log(newTime);
//     }
// });

// const notes = NotesAPI.getAllNotes()
// view.updateNoteList(notes);

// view.updateActiveNote(notes[0]);

import App from "./App.js";

const root = document.getElementById("app");
const app = new App(root);
