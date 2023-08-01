import { getActiveNotes, getArchivedNotes } from "./data.js";

// Function to render active notes table
export function renderActiveNotes() {
  const activeNotesTableBody = document.getElementById("notes-table-body");
  activeNotesTableBody.innerHTML = "";

  const activeNotes = getActiveNotes();

  activeNotes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${formatDate(note.createdAt)}</td>
      <td>${getDatesFromContent(note.content).join(
        ", "
      )}</td> <!-- Display the list of dates mentioned in the note content -->
      <td>
        <button data-id="${note.id}" class="archive-button">Archive</button>
        <button data-id="${note.id}" class="delete-button">Delete</button>
        <button data-id="${note.id}" class="edit-button">Edit</button>
      </td>
    `;
    activeNotesTableBody.appendChild(row);
  });
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleString("en-US", options);
}

export function renderArchivedNotes() {
  const archivedNotesTableBody = document.getElementById(
    "archived-notes-table-body"
  );
  archivedNotesTableBody.innerHTML = "";

  const archivedNotes = getArchivedNotes();

  archivedNotes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${note.content}</td>
     <td>${formatDate(note.createdAt)}</td> 
     <td>${note.category}</td>
      <td>${getDatesFromContent(note.content).join(", ")}</td>
      <td>
        <button data-id="${note.id}" class="unarchive-button">Unarchive</button>
      </td>
    `;
    archivedNotesTableBody.appendChild(row);
  });
}

export function renderSummary() {
  const summaryTableBody = document.getElementById("summary-table-body");
  summaryTableBody.innerHTML = "";

  const activeNotes = getActiveNotes();
  const archivedNotes = getArchivedNotes();

  const categories = ["Task", "Random Thought", "Idea"];
  categories.forEach((category) => {
    const activeNotesCount = activeNotes.filter(
      (note) => note.category === category
    ).length;
    const archivedNotesCount = archivedNotes.filter(
      (note) => note.category === category
    ).length;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>${activeNotesCount}</td>
      <td>${archivedNotesCount}</td>
    `;
    summaryTableBody.appendChild(row);
  });
}

function getDatesFromContent(content) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return content.match(datePattern) || [];
}
