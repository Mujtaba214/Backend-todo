import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const todosModel = mongoose.model("Todo", todoSchema);

export default todosModel;
