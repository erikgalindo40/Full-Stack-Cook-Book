import { HiOutlineDotsHorizontal } from 'react-icons/hi'

function Recipe({ recipeName, time, description, directions, ingredients, recipeID, setEditRecipeModal, editRecipeModal, setRecipeModalInfo }) {
    const parsedIngredients = JSON.parse(ingredients)
    const parsedDirections = JSON.parse(directions)

    return (
    <li className="recipe">
        <div className="recipe-header">
            <div>
                <h2 className='recipe-name'>{recipeName}</h2>
                <p className='recipe-time'>{time}</p>
            </div>
            <div onClick={()=>{
                setRecipeModalInfo({recipe:recipeName, id:recipeID})
                setEditRecipeModal(!editRecipeModal)
            }} 
            className='recipe-edit-button'>
                <HiOutlineDotsHorizontal/>
            </div>
        </div>
        <p className='recipe-description'>{description}</p>
        <h3>Ingredients</h3>
        <ul className="recipe-ingredients">
            {parsedIngredients.map(ingredient=>(
                <li key={ingredient.id} className="recipe-ingredient">
                    <span className='ingredient-amount'>- {ingredient.amount}</span>
                    <span className='ingredient-unit'> {ingredient.unit} </span>
                    <span className='ingredient-name'>{ingredient.name}</span>
                </li>
            ))}
        </ul>
        <ol className='recipe-directions'>
            <h3>Directions</h3>
            {parsedDirections.map(direction=>(
                <li key={direction.id} className="recipe-direction">
                    {direction.text}
                </li>
            ))}
        </ol>
    </li>
)
}

export default Recipe