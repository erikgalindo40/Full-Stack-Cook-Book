const  mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please give your dish a name']
    },
    ingredients: {
        type: [String],
        required: [true, 'Please Add Ingredient/s']
    },
    directions: {
        type: String,
        required: [true, 'Please provide directions']
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Recipe', recipeSchema)