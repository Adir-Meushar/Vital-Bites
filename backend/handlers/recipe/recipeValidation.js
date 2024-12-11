const Joi = require('joi');

const recipeValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),      // Ingredient name
            quantity: Joi.string().required()  // Ingredient quantity, e.g., "2 cups", "1 tsp"
        })
    ).min(1).required(), // At least one ingredient is required
    instructions: Joi.string().required(),
    imageUrl: Joi.string().uri(), // Validates that the URL is well-formed
    time: Joi.object({
        prep: Joi.number().integer().positive().required(),
        cook: Joi.number().integer().positive().required(),
        total: Joi.number().integer().positive() // Optional, as it could be calculated
    }).required(),
    servings: Joi.number().integer().positive().required(),
    difficulty: Joi.string().valid("easy", "medium", "hard").required(),
    tags: Joi.array().items(Joi.string()).min(1),
    nutritionInfo: Joi.object({
        calories: Joi.number().positive(),
        protein: Joi.number().positive(),
        carbs: Joi.number().positive(),
        fat: Joi.number().positive()
    })
});

module.exports = recipeValidationSchema;
