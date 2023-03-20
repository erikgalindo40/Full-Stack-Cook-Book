import { useState } from 'react'
import Ingredient from './Ingredient'
import Direction from './Direction'
import { v4 } from 'uuid'

function RecipeForm() {
    const [ingredients, setIngredients] = useState([])
    const [directions, setDirections] = useState([])
    const [recipeName, setRecipeName] = useState('')
    const [recipeTime, setRecipeTime] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')
    const [recipeSuccess, setRecipeSuccess] = useState(false)
    const [recipeError, setRecipeError] = useState(false)
    const [recipePending, setRecipePending] = useState(false)
    const [recipeErrorMessage, setRecipeErrorMessage] = useState('')

    const onAddIngredient = (e) => {
        e.preventDefault()
        setIngredients(prevState=>(
            [...prevState, {unit:'',amount:'',name:'', id:v4()}]
        ))
        console.log(ingredients)
    }
    const onAddDirection = (e) => {
        e.preventDefault()
        setDirections(prevState=>(
            [...prevState, {text:'', id:v4()}]
        ))
        console.log(directions)
    }
    const onChangeRecipeName = (e) => {
        e.preventDefault()
        setRecipeName(e.target.value)
    }
    const onChangeRecipeTime = (e) => {
        e.preventDefault()
        setRecipeTime(e.target.value)
    }
    const onChangeRecipeDescription = (e) => {
        e.preventDefault()
        setRecipeDescription(e.target.value)
    }
    const onChangeDirectionInfo = (e, id) => {
        e.preventDefault()
        const updatedDirections = directions.map(direction=>direction.id===id?{...direction, text:e.target.value}:direction)
        setDirections(updatedDirections)
    }
    const onChangeRecipeIngredient = (e,id) => {
        e.preventDefault()
        const updatedIngredients = ingredients.map(ingredient=>ingredient.id===id?{...ingredient,[e.target.name]:e.target.value}:ingredient)
        setIngredients(updatedIngredients)
    }
    const onDeleteRecipeIngredient = (e, id) => {
        e.preventDefault()
        const filteredIngredients = ingredients.filter(ingredient=>ingredient.id!==id)
        setIngredients(filteredIngredients)
    }
    const onDeleteRecipeDirection = (e, id) => {
        e.preventDefault()
        const filteredDirections = directions.filter(direction=>direction.id!==id)
        setDirections(filteredDirections)
    }
    const onSubmit = (e, recipe) => {
        e.preventDefault()
        setRecipePending(true)
        const user = JSON.parse(localStorage.getItem('user'))
        
        fetch('http://localhost:5000/api/recipes',{
            method:'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(recipe),
        })
        .then(response=>{
            if(!response.ok) {
                throw response
            }
            console.log(response.body)
            return response.json()
        })
        .then(data=>{
            setRecipePending(false)
            setRecipeSuccess(true)
            console.log(`SUCCESS: ${data}`)
        })
        .catch(error=>{
            setRecipePending(false)
            setRecipeError(true)
            error.json().then(err=>setRecipeErrorMessage(err.message))
        })
        }

    return (
    <form onSubmit={(e)=>onSubmit(e, {name:recipeName, description:recipeDescription, time:recipeTime, ingredients:JSON.stringify(ingredients), directions:JSON.stringify(directions)})} className='recipe-form form'>
        <h2>Create a recipe!</h2>
        {recipeSuccess&& <div>Success</div> }
        {recipeError&& <div className='error-message'>{recipeErrorMessage}</div> }

        <div className='recipe-header-container'>
        <label htmlFor="recipe-name">Recipe Name:</label>
        <input value={recipeName} onChange={onChangeRecipeName} className='recipe-form-input' type="text" id='recipe-name' />

        <label htmlFor="time-lengths">Time Estimate:</label>
        <select value={recipeTime} onChange={onChangeRecipeTime} className='recipe-form-select' id='time-lengths'>
            <option value=""></option>
            <option value="10 min">10 min</option>
            <option value="20 min">20 min</option>
            <option value="30 min">30 min</option>
            <option value="40 min">40 min</option>
            <option value="50 min">50 min</option>
            <option value="1 hr">1 hr</option>
            <option value="1 hr 10 min">1 hr 10 min</option>
            <option value="1 hr 20 min">1 hr 20 min</option>
            <option value="1 hr 30 min">1 hr 30 min</option>
            <option value="1 hr 40 min">1 hr 40 min</option>
            <option value="1 hr 50 min">1 hr 50 min</option>
            <option value="2 hr">2 hr</option>
            <option value="2 hr 10 min">2 hr 10 min</option>
            <option value="2 hr 20 min">2 hr 20 min</option>
            <option value="2 hr 30 min">2 hr 30 min</option>
            <option value="2 hr 40 min">2 hr 40 min</option>
            <option value="2 hr 50 min">2 hr 50 min</option>
            <option value="3 hr">3 hr</option>
            <option value="+3 hr">+3 hr</option>
        </select>
        </div>

        <label htmlFor="description">Description:</label>
        <textarea value={recipeDescription} onChange={onChangeRecipeDescription} className='recipe-form-textarea' maxLength={200} id='description'/>

        <div className='recipe-sub-header-container'>
            <button className='recipe-add-button' onClick={onAddIngredient}>+</button>
            <h3 className='recipe-form-sub-header'>Ingredients</h3>
        </div>
        <ul>
            {ingredients.map(ingredient=> {
                return (<Ingredient keyid={ingredient.id} onDeleteRecipeIngredient={onDeleteRecipeIngredient} onChangeRecipeIngredient={onChangeRecipeIngredient} unit={ingredient.unit} amount={ingredient.amount} name={ingredient.name}/>)
            })}
        </ul>

        <div className='recipe-sub-header-container'>    
            <button onClick={onAddDirection} className='recipe-add-button'>+</button>
            <h3 className='recipe-form-sub-header'>Directions</h3>
        </div>
        <ol>
            {directions.map(direction=>{
                return (<Direction onDeleteRecipeDirection={onDeleteRecipeDirection} onChangeDirectionInfo={onChangeDirectionInfo} keyid={direction.id} text={direction.text} />)
            })}
        </ol>
        {recipePending&&<div>Creating...</div>}
        <button className='form-button'>CREATE</button>
    </form>
    )
}

export default RecipeForm