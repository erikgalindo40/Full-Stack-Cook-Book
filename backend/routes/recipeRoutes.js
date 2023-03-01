const express = require('express')
const router = express.Router()
const { getRecipes, createRecipe, updateRecipe, deleteRecipe } = require(`../controllers/recipeController`)
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRecipes).post(protect, createRecipe)
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe)

module.exports = router