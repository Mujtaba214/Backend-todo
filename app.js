import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todosModel from "./models/todoModel.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db_url = "mongodb+srv://mujtaba21:mujtaba123@cluster0.tcsgq.mongodb.net/";

mongoose.connect(db_url);

mongoose.connection.on("connected", () => {
  console.log("database connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.get("/data", (req, res) => {
  todosModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  todosModel
    .create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { task, completed } = req.body; // Now handling both task and completed

  todosModel
    .findByIdAndUpdate(
      id,
      { task, completed }, // Update both task and completed status
      { new: true }
    )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  todosModel
    .findByIdAndDelete(id)
    .then((result) => res.json({ message: "Deleted successfully", result }))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
