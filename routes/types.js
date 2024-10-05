const express = require("express");
const router = express.Router();

const typesController = require("../controllers/typesController");

const validation = require("../controllers/validation");

router.get(
    "/", 
    typesController.getAll
);

router.get(
    "/:id", 
    validation.typesGetSingleValidationRules(),
    validation.validate,
    typesController.getSingle
);

router.post(
    "/", 
    validation.typesCreateValidationRules(),
    validation.validate,
    typesController.createType
);

router.put(
    "/:id", 
    validation.typesUpdateValidationRules(),
    validation.validate,
    typesController.updateType
);

router.delete(
    "/:id", 
    validation.typesDeleteValidationRules(),
    validation.validate,
    typesController.deleteType
);

module.exports = router;