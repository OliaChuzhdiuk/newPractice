import {
  renderActiveNotes,
  renderArchivedNotes,
  renderSummary,
} from "./render.js";
import {
  toggleNoteArchive,
  addNote,
  getActiveNotes,
  removeNote,
} from "./data.js";
import { openAddNoteModal, closeAddNoteModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  renderActiveNotes();
  renderArchivedNotes();
  renderSummary();
  closeAddNoteModal();
});

document.getElementById("add-note-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const noteContentInput = document.getElementById("note-content");
  const noteCategorySelect = document.getElementById("note-category");

  const noteContent = noteContentInput.value.trim();
  const noteCategory = noteCategorySelect.value;

  if (noteContent === "") {
    alert("Please enter a valid note content.");
    return;
  }

  const newNote = {
    id: Date.now(),
    createdAt: new Date(),
    content: noteContent,
    category: noteCategory,
  };

  addNote(newNote);
  noteContentInput.value = "";
  renderActiveNotes();
  renderSummary();
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("archive-button") ||
    target.classList.contains("unarchive-button")
  ) {
    const noteId = parseInt(target.dataset.id, 10);
    toggleNoteArchive(noteId);

    renderActiveNotes();
    renderArchivedNotes();
    renderSummary();
  }

  if (target.classList.contains("edit-button")) {
    const noteId = parseInt(target.dataset.id, 10);
    const note = getActiveNotes().find((note) => note.id === noteId);

    if (note) {
      const newContent = prompt("Edit the note content:", note.content);
      if (newContent !== null) {
        note.content = newContent.trim();
        renderActiveNotes();
        renderSummary();
      }
    }
  }

  if (target.classList.contains("delete-button")) {
    const noteId = parseInt(target.dataset.id, 10);
    removeNoteAndRender(noteId);
  }
});

function removeNoteAndRender(noteId) {
  removeNote(noteId);
  renderActiveNotes();
  renderSummary();
}

document.getElementById("create-note-button").addEventListener("click", () => {
  openAddNoteModal();
});

document.getElementById("close-modal").addEventListener("click", () => {
  closeAddNoteModal();
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("add-note-modal");
  if (event.target === modal) {
    closeAddNoteModal();
  }
});

document.getElementById("add-note-form").addEventListener("submit", (event) => {
  event.preventDefault();
  closeAddNoteModal();
});
