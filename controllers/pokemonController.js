const pokemonController = {};
const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;


pokemonController.getAll = async (req, res) => {
    console.log("In getAll:", req.url, req.params, req.path);
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};


pokemonController.getSingle = async(req, res) => {
    console.log("In getSingle:", req.url, req.params, req.path);
    const contactsId = new ObjectID(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({_id: contactsId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};


module.exports = pokemonController;