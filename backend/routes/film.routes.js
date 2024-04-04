const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  insert,
  deleteOne,
} = require("../controllers/film.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, findAll);
router.get("/:id", isAuthenticated, findById);
router.post("/", isAdmin, insert);
router.delete("/:id", isAdmin, deleteOne);

module.exports = router;
