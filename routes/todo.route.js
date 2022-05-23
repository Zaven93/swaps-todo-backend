const router = require("express").Router();
const {
  getTodoById,
  getTodos,
  createTodo,
  updateTodo,
  removeTodo,
} = require("../controllers/todo.controller");
const { auth } = require("../middlewares/auth");

router.post("/", auth, createTodo);

router.get("/", auth, getTodos);

router.get("/:id", getTodoById);

router.put("/:id", auth, updateTodo);

router.delete("/:id", removeTodo);

module.exports = router;
