const express = require("express");
const router = express.Router();
const { check, query, param, validationResult } = require('express-validator');

const typesController = require("../controllers/typesController");

router.get(
    "/", 
    typesController.getAll
);

router.get(
    "/:id", 
    param("id").isInt({ min: 1, max: 250 }).withMessage("Type ID must be an integer between 1 and 250"),
    typesController.getSingle
);

router.post(
    "/", 
    check("type_id").isInt({ min: 1, max: 250 }).withMessage("Type ID must be an integer between 1 and 250"),
    check("name").isString().isLength({min: 1, max: 40}).withMessage("Name must be a string with 1 to 40 characters"),
    check("weaknesses").isArray({min: 0, max: 5}).withMessage("Weaknesses must be an array with 0 to 5 types"),
    check("strengths").isArray({min: 0, max: 5}).withMessage("Strengths must be an array with 0 to 5 types"),
    check("effectless").isArray({min: 0, max: 5}).withMessage("Effectless must be an array with 0 to 5 types"),
    typesController.createType
);

router.put(
    "/:id", 
    param("id").isInt({ min: 1, max: 250 }).withMessage("Type ID must be an integer between 1 and 250"),
    check("type_id").isInt({ min: 1, max: 250 }).withMessage("Type ID must be an integer between 1 and 250"),
    check("name").isString().isLength({min: 1, max: 40}).withMessage("Name must be a string with 1 to 40 characters"),
    check("weaknesses").isArray({min: 0, max: 5}).withMessage("Weaknesses must be an array with 0 to 5 types"),
    check("strengths").isArray({min: 0, max: 5}).withMessage("Strengths must be an array with 0 to 5 types"),
    check("effectless").isArray({min: 0, max: 5}).withMessage("Effectless must be an array with 0 to 5 types"),
    typesController.updateType
);

router.delete(
    "/:id", 
    param("id").isInt({ min: 1, max: 250 }).withMessage("Type ID must be an integer between 1 and 250"),
    typesController.deleteType
);

module.exports = router;