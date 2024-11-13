const express = require("express");
const verify = require("../middleware/privateRoute");
const router = express.Router();

const {
  getTodoList,
  createATodo,
  deleteATodo,
  updateATodo,
} = require("../Controllers/todo");

router.get("/", verify, getTodoList);

router.post("/", verify, createATodo);

router.delete("/:id", verify, deleteATodo);

router.patch("/:id", verify, updateATodo);

module.exports = router;
