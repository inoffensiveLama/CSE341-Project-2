const typesController = {};
const mongodb = require("../data/database");
const { check, query, param, validationResult } = require('express-validator');


typesController.getAll = async (req, res) => {
    //swagger.tags=["Types"]
    const result = await mongodb.getDatabase().db().collection("types").find();
    result.toArray().then((type) => {
        if (type.length === 0) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(type);
    });
};


typesController.getSingle = async(req, res) => {
    //swagger.tags=["Types"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const typeId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().db().collection("types").find({type_id: typeId});
    result.toArray().then((type) => {
        if (type.length === 0) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(type);
    });
};


typesController.createType = async (req, res) => {
    //swagger.tags=["Types"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const type = {
        type_id: req.body.pokemon_id,
        name: req.body.name,
        weaknesses: req.body.types,
        strengths: req.body.evolutions,
        effectless: req.body.stats
    };
    const result = await mongodb.getDatabase().db().collection("types").insertOne(type);
    if (result.acknowledged) {
        res.status(201).json({type_id: result.insertedId});
    } else {
        res.status(500).json(result.error || "Some error occured while creating the type");
    }
};


typesController.updateType = async (req, res) => {
    //swagger.tags=["Types"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const typeId = parseInt(req.params.id);
    const type = {
        type_id: req.body.pokemon_id,
        name: req.body.name,
        weaknesses: req.body.types,
        strengths: req.body.evolutions,
        effectless: req.body.stats
    };
    const result = await mongodb.getDatabase().db().collection("types").replaceOne({type_id: typeId}, type);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while updating the type");
    }
};


typesController.deleteType = async (req, res) => {
    //swagger.tags=["Types"]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const typeId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().db().collection("types").deleteOne({type_id: typeId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while deleting the type");
    }
}


module.exports = typesController;