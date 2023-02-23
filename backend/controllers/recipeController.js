const asyncHandler = require("express-async-handler")

// DESC    Get All Recipes
// ROUTE   GET /api/recipes
// ACCESS  Private
const getRecipes = asyncHandler(async (req,res) => {
    res.status(200).json({GET:`getting recipes`})
})
// DESC    Create a Recipe
// ROUTE   POST /api/recipes
// ACCESS  Private
const createRecipe = asyncHandler(async (req,res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(201).json({POST:`creating recipes`})
})
// DESC    Update a Recipe
// ROUTE   PUT /api/recipes/:id
// ACCESS  Private
const updateRecipe = asyncHandler(async (req,res) => {
    res.status(200).json({PUT:`updating recipe ${req.params.id}`})
})
// DESC    Delete a recipe
// ROUTE   DELETE /api/recipes/:id
// ACCESS  Private
const deleteRecipe = asyncHandler(async (req,res) => {
    res.status(200).json({DELETE:`deleting recipe ${req.params.id}`})
})

module.exports = {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}