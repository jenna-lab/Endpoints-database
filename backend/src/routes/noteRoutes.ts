import { Router, Request, Response } from "express";
import {
  addNote,
  getNotes,
  TestingRoute,
} from "../controllers/noteController";

const noterouter: Router = Router();

noterouter.get("/all", getNotes);
noterouter.post("/", addNote);
noterouter.get("/", TestingRoute);


export default noterouter;
