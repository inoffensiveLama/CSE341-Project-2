const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemonController");

router.get("/", pokemonController.getAll);

router.get("/:id", pokemonController.getSingle);

module.exports = router;