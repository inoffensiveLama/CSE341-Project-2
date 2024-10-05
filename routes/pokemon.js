const express = require("express");
const router = express.Router();
const { check, query, param, validationResult } = require('express-validator');

const pokemonController = require("../controllers/pokemonController");

const validation = require("../controllers/validation");

router.get(
    "/", 
    pokemonController.getAll
);

router.get(
    "/:id", 
    validation.pokemonGetSingleValidationRules(),
    validation.validate,
    pokemonController.getSingle
);

router.post(
    "/", 
    validation.pokemonCreateValidationRules(),
    validation.validate,
    pokemonController.createPokemon
);
 
router.put(
    "/:id", 
    validation.pokemonUpdateValidationRules(),
    validation.validate,
    pokemonController.updatePokemon
);

router.delete(
    "/:id", 
    validation.pokemonDeleteValidationRules(),
    validation.validate,
    pokemonController.deletePokemon
);

module.exports = router;