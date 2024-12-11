const mongoose = require('mongoose');
const moment = require('moment');


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        name: { type: String, required: true }, // Ingredient name
        quantity: { type: String, required: true } // Quantity, e.g., "2 cups", "1 tsp"
    }],
    instructions: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdTime: { 
        type: String,
        default: () => moment().format('D-M-Y HH:mm:ss') 
    },
    favoritedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    time: {
        prep: { type: Number, required: true }, 
        cook: { type: Number, required: true }, 
        total: { type: Number } 
    },
    servings: {
        type: Number, 
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"], 
        default: "medium"
    },
    tags: [{
        type: String 
    }],
    imageUrl: {
        type: String, 
    },
    nutritionInfo: {
        calories: { type: Number },
        protein: { type: Number },
        carbs: { type: Number },
        fat: { type: Number }
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);
