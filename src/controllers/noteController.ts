import { Response, Request } from "express";
import { sqlConfig } from "../config/sqlConfig";
import mssql from "mssql";
import { v4 } from "uuid";
import connection from "../database helpers/dbConnect";
import { noteSchema } from "../validators/noteValidators";
const dbhelpers = new connection();

export function TestingRoute(req: Request, res: Response) {
  return res.send("Server Running");
}

export const getNotes = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let notes = (await pool.request().execute("fetchNotes")).recordset;

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
  console.log(req.body);

  try {
    let { title, description, content } = req.body;

    const { error } = noteSchema.validate(req.body);

    if (error) {
      return res.status(422).json(error);
    }

    let note_id = v4();

    let result = dbhelpers.execute("addNote", {
      note_id,
      title,
      description,
      content,
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