const typesController = {};
const mongodb = require("../data/database");


typesController.getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("types").find();
    result.toArray().then((type) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(type);
    });
};


typesController.getSingle = async(req, res) => {
    const typeId = parseInt(req.params.id);
    const result = await mongodb.getDatabase().db().collection("types").find({type_id: typeId});
    result.toArray().then((type) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(type);
    });
};


module.exports = typesController;