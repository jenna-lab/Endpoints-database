import { Response, Request } from "express";
import { sqlConfig } from "../config/sqlConfig";
import mssql from "mssql";
import { v4 } from "uuid";
import connection from "../database helpers/dbConnect";
import { noteSchema } from "../validators/noteValidators";
const dbhelpers = new connection();

export function TestingRoute(req: Request, res: Response) {
  // console.log("sdasd");
  
  return res.send("x Running");
}

export const getNotes = async (req: Request, res: Response) => {
  // console.log("sdfghjhkdfghjk");
  
  try {
    const pool = await mssql.connect(sqlConfig);

    let notes = (await pool.request().execute("getNotesProc")).recordset;

    // console.log(notes);
    
    return res.status(200).json(
      notes,
    );
  } catch (error) {
    return res.json({
      error :"internal server error",
    });
  }
};

export const addNote = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    let { title, content } = req.body;

    const { error } = noteSchema.validate(req.body);

    if (error) {
      return res.status(422).json({
        error: "Invalid data",
      });
    }

    let note_id = v4();

    let result = dbhelpers.execute("createNoteProc", {
      title,
      content
    });

    return res.status(200).json({
      message: "Note added Successfuly",
    });
  } catch (error) {
    return res.json({
      error: "internal server error",
    });
  }
};