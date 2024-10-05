const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemonController");

const validation = require("../middleware/validation");

const { isAuthenticated } = require("../middleware/authenticate");

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
    isAuthenticated,
    validation.pokemonCreateValidationRules(),
    validation.validate,
    pokemonController.createPokemon
);
 
router.put(
    "/:id",  
    isAuthenticated,
    validation.pokemonUpdateValidationRules(),
    validation.validate,
    pokemonController.updatePokemon
);

router.delete(
    "/:id",  
    isAuthenticated,
    validation.pokemonDeleteValidationRules(),
    validation.validate,
    pokemonController.deletePokemon
);

module.exports = router;