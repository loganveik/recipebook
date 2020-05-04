const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  ingredients: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
