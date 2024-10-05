const express = require("express");
const router = express.Router();

const typesController = require("../controllers/typesController");

const validation = require("../middleware/validation");

const { isAuthenticated } = require("../middleware/authenticate");

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
    isAuthenticated,
    validation.typesCreateValidationRules(),
    validation.validate,
    typesController.createType
);

router.put(
    "/:id",  
    isAuthenticated,
    validation.typesUpdateValidationRules(),
    validation.validate,
    typesController.updateType
);

router.delete(
    "/:id",  
    isAuthenticated,
    validation.typesDeleteValidationRules(),
    validation.validate,
    typesController.deleteType
);

module.exports = router;