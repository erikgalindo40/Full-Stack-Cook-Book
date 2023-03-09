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
    time: {
        type: String,
        required: [true, 'Please give your dish a time']
    },
    ingredients: {
        type: [Object],
        required: [true, 'Please add Ingredient/s']
    },
    directions: {
        type: [String],
        required: [true, 'Please provide directions']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Recipe', recipeSchema)