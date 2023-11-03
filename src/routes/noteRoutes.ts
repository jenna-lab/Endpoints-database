import { Router, Request, Response } from "express";
import {

getNotes,
addNote
} from "../controllers/noteController";

const noterouter: Router = Router();

noterouter.get("/", getNotes);
noterouter.post("/", addNote);

export default noterouter;
