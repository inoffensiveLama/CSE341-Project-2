const typesController = {};
const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;


typesController.getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};


typesController.getSingle = async(req, res) => {
    const contactsId = new ObjectID(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({_id: contactsId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};


module.exports = typesController;