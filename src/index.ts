import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
