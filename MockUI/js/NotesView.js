export default class NotesView
{
    constructor(root, {noteSelect, noteAdd, noteEdit, noteDelete} = {}){
        this.root=root;
        this.noteSelect = noteSelect;
        this.noteAdd = noteAdd;
        this.noteEdit = noteEdit;
        this.noteDelete = noteDelete;
        this.root.innerHTML = `
            <div class="notes-sidebar">
                <p>Notes <button class="notes-add">+</button></p>
                <div class="notes-list">
                </div>
            </div>
            <div class="notes-preview">
                <h4 class="notes-time">Last updated:</h4>
                <input type="text" class="notes-title" placeholder="Enter title">
                <textarea class="notes-body"></textarea>
                <button class="notes-delete">Delete</button>
            </div>
        `;
        const btnAddNote = this.root.querySelector(".notes-add");
        const inpTitle = this.root.querySelector(".notes-title");
        const inpBody = this.root.querySelector(".notes-body");
        const inpTime = this.root.querySelector(".notes-time");
        const btnDeleteNote = this.root.querySelector(".notes-delete");

        btnAddNote.addEventListener("click", () => {
            this.noteAdd(); 
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updateBody = inpBody.value.trim();
                const updateTime = new Date().toLocaleTimeString();

                this.noteEdit(updatedTitle, updateBody, updateTime);
            });
        });

        // 
        


        

        this.updateNotePreviewVisibility(false);

    }

    _createListItemHTML(id, title)
    {
        return `
            <div class="notes-list-item" data-note-id="${id}">
                <div class="notes-small-title">${title}</div>
            </div>    
        
        `;
    }

    updateNoteList(notes){
        const notesListContainer = this.root.querySelector(".notes-list");
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title);

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        notesListContainer.querySelectorAll(".notes-list-item").forEach(notesListItem => {
            notesListItem.addEventListener("click", () => {
                this.noteSelect(notesListItem.dataset.noteId);
            });
        });
    }

    updateActiveNote(note){
        this.root.querySelector(".notes-title").value = note.title;
        this.root.querySelector(".notes-body").value = note.body;

        this.root.querySelectorAll(".notes-list-item").forEach(notesListItem => {
            notesListItem.classList.remove("notes-list-item--selected");
        });

        this.root.querySelector(`.notes-list-item[data-note-id="${note.id}"]`).classList.add("notes-list-item--selected");
    }

    updateNotePreviewVisibility(visible){
        this.root.querySelector(".notes-preview").style.visibility = visible ? "visible" : "hidden";
    }
}