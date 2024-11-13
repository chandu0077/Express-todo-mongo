const Todo = require("../model/Todos");

const getTodoList = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createATodo = async (req, res) => {
  try {
    const newPost = Todo.create({ title: req.body.title, user: req.user._id });
    if (!newPost) throw Error("Something went wrong while saving the Post.");
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteATodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) throw Error("Something went wrong while deleting the Todo.");
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: err });
  }
};

const updateATodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) throw Error("Something went wrong while updating the Todo.");
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: err });
  }
};
module.exports = {
  getTodoList,
  createATodo,
  deleteATodo,
  updateATodo,
};
