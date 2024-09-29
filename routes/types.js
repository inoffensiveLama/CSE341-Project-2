const express = require("express");
const router = express.Router();

const typesController = require("../controllers/typesController");

router.get("/", typesController.getAll);

router.get("/:id", typesController.getSingle);

module.exports = router;