import { Request, Response } from "express";
import { notes } from "../data";
import { Note } from "../types/interface";

export function getNotes(req: Request, res: Response) {
  return res.json(notes);
}

export function getNoteById(req: Request, res: Response) {
  let id = parseInt(req.params.noteID);
  let note = notes.find((note) => note.id === id);
  if (note) {
    return res.json(note);
  } else {
    return res.status(404).json({ message: "Note not found" });
  }
}

export function deleteNote(req: Request, res: Response) {
  let id = parseInt(req.params.noteID);
  let indexofNote = notes.findIndex((note) => note.id === id);

  if (indexofNote === -1) {
    return res.status(404).json({ message: "Note not found" });
  } else {
    notes.splice(indexofNote, 1);
    return res.status(200).json({ message: "Note deleted" });
  }
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
  const newNote: Note = req.body;
  if (notes.length > 0) {
    const lastNote = notes[notes.length - 1];
    newNote.id = lastNote.id + 1;
  } else {
    newNote.id = 1;
  }
  //   notes.push(newNote);
  return res.status(201).json({ message: "Note added successfully" });
}
