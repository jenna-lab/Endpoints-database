import { Request, Response } from "express";
import { notes } from "../data";
import { Note } from "../types/interface";
import mssql from "mssql"
import { sqlConfig } from "../config/sqlConfig";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(`SELECT * FROM Notess`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes from the database" });
  }
};


  export async function addNote(req: Request, res: Response) {
    let { title, description, content } = req.body;
    let query = `INSERT INTO notes (note_id, title, content) VALUES ('${id}', '${title}', '${content}')`;

    mssql
      .connect(sqlConfig)
      .then((pool) => {
        return pool.request().query(query);
      })
      .then((result) => {
        console.log("success", result);
      })
      .catch((err) => {
        console.log(err);

        return res.status(500).json({
          error: err.message || "An error occurred while registering the note.",
        });
      });
  }
