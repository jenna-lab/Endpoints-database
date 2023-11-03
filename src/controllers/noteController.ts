import { Response, Request } from "express";
import { sqlConfig } from "../config/sqlConfig";
import mssql from "mssql";
import { v4 } from "uuid";
import connection from "../database helpers/dbConnect";

export function TestingRoute(req: Request, res: Response) {
  return res.send("Server Running well");
}

export const getNotes = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let notes = (await pool.request().execute("fetchAllNotes")).recordset;

    return res.status(200).json({
      notes: notes,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const addNote = async (req: Request, res: Response) => {
  try {
    let { title, description, note } = req.body;

    let note_id = v4();

    let result = connection.arguments("addNote", {
      note_id,
      title,
      description,
      note,
    });

    return res.status(200).json({
      message: "Note added",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};