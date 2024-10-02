const pokemonController = {};
const mongodb = require("../data/database");
const { check, query, param, validationResult } = require('express-validator');


pokemonController.getAll = async (req, res) => {
    //swagger.tags=["Pokemon"]
    const result = await mongodb.getDatabase().db().collection("pokemon").find();
    result.toArray().then((pokemon) => {
        if (pokemon.length === 0) {
            return res.status(404).json({ message: "Pokemon not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(pokemon);
    });
};


pokemonController.getSingle = async(req, res) => {
    //swagger.tags=["Pokemon"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const pokemonId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().db().collection("pokemon").find({pokemon_id: pokemonId});
    result.toArray().then((pokemon) => {
        if (pokemon.length === 0) {
            return res.status(404).json({ message: "Pokemon not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(pokemon);
    });
};


pokemonController.createPokemon = async (req, res) => {
    //swagger.tags=["Pokemon"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const pokemon = {
        pokemon_id: req.body.pokemon_id,
        name: req.body.name,
        types: req.body.types,
        evolutions: req.body.evolutions,
        stats: req.body.stats
    };
    const result = await mongodb.getDatabase().db().collection("pokemon").insertOne(pokemon);
    if (result.acknowledged) {
        res.status(201).json({pokemon_id: result.insertedId});
    } else {
        res.status(500).json(result.error || "Some error occured while creating the pokemon");
    }
};


pokemonController.updatePokemon = async (req, res) => {
    //swagger.tags=["Pokemon"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const pokemonId = parseInt(req.params.id);
    const pokemon = {
        pokemon_id: req.body.pokemon_id,
        name: req.body.name,
        types: req.body.types,
        evolutions: req.body.evolutions,
        stats: req.body.stats
    };
    const result = await mongodb.getDatabase().db().collection("pokemon").replaceOne({pokemon_id: pokemonId}, pokemon);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while updating the pokemon");
    }
};


pokemonController.deletePokemon = async (req, res) => {
    //swagger.tags=["Pokemon"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const pokemonId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().db().collection("pokemon").deleteOne({pokemon_id: pokemonId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while deleting the pokemon");
    }
}


module.exports = pokemonController;