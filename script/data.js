const notes = [
  {
    id: 1,
    createdAt: new Date("2023-07-30T09:00:00"),
    content: "Complete the project",
    category: "Task",
  },
  {
    id: 2,
    createdAt: new Date("2023-07-29T13:30:00"),
    content: "I have a great idea!",
    category: "Idea",
  },
];

export function getActiveNotes() {
  return notes.filter((note) => !note.archived);
}

export function getArchivedNotes() {
  return notes.filter((note) => note.archived);
}

export function toggleNoteArchive(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = !notes[noteIndex].archived;
  }
}

export function addNote(note) {
  notes.push(note);
}

export function removeNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
  }
}
