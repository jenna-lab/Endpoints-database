import express from "express";
import noteRouter from "./routes/noteRoutes";
import { testConnection } from "./config/sqlConfig";

const app = express();

app.use(express.json());

app.use("/note", noteRouter);


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server running on port: ${port}`)} );
testConnection()