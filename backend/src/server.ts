import express from "express";
import noteRouter from "./routes/noteRoutes";
import { testConnection } from "./config/sqlConfig";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/note", noteRouter);


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server running on port: ${port}`)} );
testConnection()