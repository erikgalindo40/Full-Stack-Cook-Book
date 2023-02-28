const asyncHandler = require("express-async-handler")
const Recipe = require('../models/recipeModel')

// DESC    Get All Recipes
// ROUTE   GET /api/recipes
// ACCESS  Private
const getRecipes = asyncHandler(async (req,res) => {
    const recipes = await Recipe.find()

    res.status(200).json(recipes)
})
// DESC    Create a Recipe
// ROUTE   POST /api/recipes
// ACCESS  Private
const createRecipe = asyncHandler(async (req,res) => {
    if (!req.body.name || !req.body.ingredients || !req.body.directions) {
        res.status(400)
        throw new Error('Please add required fields')
    }

    const recipe = await Recipe.create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
    })

    res.status(201).json(recipe)
})
// DESC    Update a Recipe
// ROUTE   PUT /api/recipes/:id
// ACCESS  Private
const updateRecipe = asyncHandler(async (req,res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedRecipe)
})
// DESC    Delete a recipe
// ROUTE   DELETE /api/recipes/:id
// ACCESS  Private
const deleteRecipe = asyncHandler(async (req,res) => {
    await Recipe.findByIdAndDelete(req.params.id)
    
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}