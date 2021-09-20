import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App{
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes(){
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        if(notes.length > 0)
        {
            this._setActiveNote(notes[notes.size-1]);
        }
    }

    _setNotes(notes){
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note){
        this.activeNote=note;
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            noteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },

            noteAdd: () => {
                const newNote = {
                    title: "Enter title",
                    body: "take a note..."
                };

                NotesAPI.saveNote(newNote);
                
                this._refreshNotes();
            },

            noteEdit: (title,body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body

                });

                this._refreshNotes();
            },

            noteDelete: noteId => {
                NotesAPI.deleteNode(noteId);
                this._refreshNotes();
            }, 


        };
    }
}