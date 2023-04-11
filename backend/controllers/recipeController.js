const asyncHandler = require("express-async-handler")
const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')

// DESC    Get All Recipes
// ROUTE   GET /api/recipes
// ACCESS  Private
const getRecipes = asyncHandler(async (req,res) => {
    const recipes = await Recipe.find({user:req.user.id})

    res.status(200).json(recipes)
})
// DESC    Create a Recipe
// ROUTE   POST /api/recipes
// ACCESS  Private
const createRecipe = asyncHandler(async (req,res) => {
    const {name, ingredients, directions, time, description} = req.body

    if (name=='' || ingredients=='' || directions=='' || description=='' || time=='') {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const recipe = await Recipe.create({
        name: name,
        ingredients: ingredients,
        directions: directions,
        description: description,
        time: time,
        user: req.user.id,
    })

    res.status(201).json(recipe)
})
// DESC    Update a Recipe
// ROUTE   PUT /api/recipes/:id
// ACCESS  Private
const updateRecipe = asyncHandler(async (req,res) => {
    const recipe = await Recipe.findById(req.params.id)

    //check for recipe
    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    const {name, ingredients, directions, time, description} = req.body

    if (name=='' || ingredients=='' || directions=='' || description=='' || time=='') {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //compare logged in user and recipe user
    if(recipe.user.toString()!==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedRecipe)
})
// DESC    Delete a recipe
// ROUTE   DELETE /api/recipes/:id
// ACCESS  Private
const deleteRecipe = asyncHandler(async (req,res) => {
    const recipe = await Recipe.findById(req.params.id)

    //check for recipe
    if (!recipe) {
        res.status(400)
        throw new Error('Recipe not found')
    }

    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //compare logged in user and recipe user
    if(recipe.user.toString()!==req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Recipe.findByIdAndDelete(req.params.id)

    res.status(200).json({id:req.params.id})
})

module.exports = {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}