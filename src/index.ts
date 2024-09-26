import express from "express";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
