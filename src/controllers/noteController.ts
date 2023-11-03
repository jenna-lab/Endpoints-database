import { Request, Response } from "express";
import { notes } from "../data";
import { Note } from "../types/interface";
import mssql from "mssql"
import { sqlConfig } from "../config/sqlConfig";


// export const getNotes = async(req: Request, res: Response) => {
//   // return res.json(notes);
//   const pool =  await mssql.connect(sqlConfig)
//   let result = await pool.query(`SELECT * FROM Notes`)
// }
export const getNotes = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(`SELECT * FROM Notess`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes from the database" });
  }
};


// export function getNoteById(req: Request, res: Response) {
//   let id = parseInt(req.params.noteID);
//   let note = notes.find((note) => note.id === id);
//   if (note) {
//     return res.json(note);
//   } else {
//     return res.status(404).json({ message: "Note not found" });
//   }
// }
export function getNoteById(req: Request, res: Response) {
  const id = parseInt(req.params.noteID);

  const pool = new mssql.ConnectionPool(sqlConfig);
  const request = new mssql.Request(pool);

  pool.connect(err => {
    if (err) {
      console.error("Database connection failed", err);
      return res.status(500).json({ message: "Database connection failed" });
    }

    request.query(`SELECT * FROM Notes WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).json({ message: "Error executing query" });
      }

      if (result) {
        return res.json(result.recordset[0]);
      } else {
        return res.status(404).json({ message: "Note not found" });
      }
    });
  });
}

// export function deleteNote(req: Request, res: Response) {
//   let id = parseInt(req.params.noteID);
//   let indexofNote = notes.findIndex((note) => note.id === id);

//   if (indexofNote === -1) {
//     return res.status(404).json({ message: "Note not found" });
//   } else {
//     notes.splice(indexofNote, 1);
//     return res.status(200).json({ message: "Note deleted" });
//   }
// }

export function deleteNote(req: Request, res: Response) {
  const id = parseInt(req.params.noteID);

  const pool = new mssql.ConnectionPool(sqlConfig);
  const request = new mssql.Request(pool);

  pool.connect((err) => {
    if (err) {
      console.error('Database connection failed', err);
      return res.status(500).json({ message: 'Database connection failed' });
    }

    request.query(`DELETE FROM Notes WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        return res.status(500).json({ message: 'Error executing query' });
      }

      if (result) {
        return res.status(200).json({ message: 'Note deleted' });
      } else {
        return res.status(404).json({ message: 'Note not found' });
      }
    });
  });
}


export function updateNote(req: Request, res: Response) {
  const id = parseInt(req.params.noteID);
  const indexofNote = notes.findIndex((note) => note.id === id);
  if (indexofNote === -1) {
    return res.status(404).json({ message: "Note not found" });
  } else {
    const updatedNote: Note = req.body;
    notes[indexofNote] = { ...notes[indexofNote], ...updatedNote };
    return res.status(200).json({ message: "Note updated successfully" });
  }
}

export function addNote(req: Request, res: Response) {
//     const newNote: Note = req.body;
//    if (notes.length > 0) {
//     const newId = notes[notes.length - 1].id + 1;
//     newNote.id = newId;
//     notes.push(newNote);
//    }

}
