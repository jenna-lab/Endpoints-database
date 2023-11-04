const noteslist = document.getElementById("noteslist") as HTMLElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", () => {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.forEach((note: any) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
        `;
    noteslist.appendChild(noteElement);
  });

  async function getData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Failed to fetch data from ${url}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const displayNotes = async () => {
    const notes = await getData("http://localhost:4000/note/all");
    console.log(notes);
    // localStorage.setItem("notes", JSON.stringify(notes));
    noteslist.innerHTML = "";
    notes.forEach((note: any) => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.Content}</p>
        `;
      noteslist.appendChild(noteElement);
    });
  };
  displayNotes();

  if (addButton) {
    addButton.addEventListener("click", async (event) => {
      event.preventDefault(); 
      const title = (document.getElementById("noteTitle") as HTMLInputElement).value;
      const content = (document.getElementById("noteContent") as HTMLInputElement).value;
      const note = {
        title,
        content,
      };
      const response = await fetch("http://localhost:4000/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (response.ok) {
        displayNotes();
      }
    });
  }
});