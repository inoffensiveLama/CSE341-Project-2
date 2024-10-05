const { check, query, param, validationResult } = require('express-validator');
const validation = {};


validation.pokemonGetSingleValidationRules = () => {
    return [
        param("id").isInt({ min: 1, max: 250 }).withMessage("Pokemon ID must be an integer between 1 and 250")
    ]
}

validation.pokemonCreateValidationRules = () => {
    return [
        check("pokemon_id").isInt({ min: 1, max: 250 }).withMessage("Pokemon ID must be an integer between 1 and 250"),
        check("name").isString().isLength({min: 1, max: 40}).withMessage("Name must be a string with 1 to 40 characters"),
        check("types").isArray({min: 1, max: 2}).withMessage("Types must be an array with 1 or 2 types"),
        check("evolutions").isArray({min: 1, max: 3}).withMessage("Evolutions must be an array with 1 to 3 evolutions"),
        check("stats").isObject().withMessage("Stats must be an object containing hp, attack, defense, special_attack, special_defense and speed"),
        check("stats.hp").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.attack").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.defense").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.special_attack").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.special_defense").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.speed").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250")
    ]
}

validation.pokemonUpdateValidationRules = () => {
    return [
        param("id").isInt({ min: 1, max: 250 }).withMessage("Pokemon ID must be an integer between 1 and 250"),
        check("pokemon_id").isInt({ min: 1, max: 250 }).withMessage("Pokemon ID must be an integer between 1 and 250"),
        check("name").isString().isLength({min: 1, max: 40}).withMessage("Name must be a string with 1 to 40 characters"),
        check("types").isArray({min: 1, max: 2}).withMessage("Types must be an array with 1 or 2 types"),
        check("evolutions").isArray({min: 1, max: 3}).withMessage("Evolutions must be an array with 1 to 3 evolutions"),
        check("stats").isObject().withMessage("Stats must be an object containing hp, attack, defense, special_attack, special_defense and speed"),
        check("stats.hp").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.attack").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.defense").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.special_attack").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.special_defense").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250"),
        check("stats.speed").isInt({ min: 1, max: 250 }).withMessage("HP must be an integer between 1 and 250")
    ]
}

validation.pokemonDeleteValidationRules = () => {
    return [
        param("id").isInt({ min: 1, max: 250 }).withMessage("Pokemon ID must be an integer between 1 and 250")
    ]
}

validation.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    console.log(errors);
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg })) // ! If not path try param

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = validation;