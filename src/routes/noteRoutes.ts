import { Router, Request, Response } from "express";
import {

getNotes,
getNoteById,
deleteNote,
updateNote,
addNote
} from "../controllers/noteController";

const noterouter: Router = Router();

noterouter.get("/", getNotes);
noterouter.get("/:noteID", getNoteById);
noterouter.delete("/:noteID", deleteNote);
noterouter.put("/:noteID", updateNote);
noterouter.post("/", addNote);

export default noterouter;
