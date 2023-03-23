import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RecipeForm from '../components/RecipeForm'
import Recipe from '../components/Recipe'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

function Dashboard() {
  const navigate = useNavigate()
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    if(!localStorage.getItem('user')) {
      navigate('/Login')
      return
    }

    const user = JSON.parse(localStorage.getItem('user'))

    fetch('/api/recipes', {
      headers:{
        authorization: `Bearer ${user.token}`
      }
    })
    .then(response=>{
      if(!response.ok) {
        throw Promise.reject(response)
      }
      return response.json()
    })
    .then(data=>{
      setRecipeList(data)
    })
    .catch(error=>{
      error.json().then(err=>console.log(`ERROR: ${err}`))
    })

  }, [navigate])
  

  return (
    <main className='dashboard-container'>
      <RecipeForm />
        <ul className='recipes'>
          {recipeList.map(recipe=>(
            <Recipe key={recipe._id} recipeID={recipe._id} recipeName={recipe.name} ingredients={recipe.ingredients} directions={recipe.directions} time={recipe.time} description={recipe.description}/>
          ))}
        
        <li key={'lmao'} className="recipe">
        <div className="recipe-header">
          <div>
            <h2 className='recipe-name'>A super long really long recipe name</h2>
            <p className='recipe-time'>10min</p>
          </div>
            <div className='recipe-edit-button'><HiOutlineDotsHorizontal/></div>
        </div>
        <p className='recipe-description'>This is a description of the meal lol</p>
        <h3>Ingredients</h3>
        <ul className="recipe-ingredients">
                <li key={'lol'} className="recipe-ingredient">
                    <span className='ingredient-amount'>- 2</span>
                    <span className='ingredient-unit'> cup/s </span>
                    <span className='ingredient-name'>Milk</span>
                </li>
                <li key={'lol2'} className="recipe-ingredient">
                    <span className='ingredient-amount'>- 2</span>
                    <span className='ingredient-unit'> cup/s </span>
                    <span className='ingredient-name'>Milk</span>
                </li>
                <li key={'lol3'} className="recipe-ingredient">
                    <span className='ingredient-amount'>- 2</span>
                    <span className='ingredient-unit'> cup/s </span>
                    <span className='ingredient-name'>Milk</span>
                </li>
                <li key={'lol4'} className="recipe-ingredient">
                    <span className='ingredient-amount'>- 2</span>
                    <span className='ingredient-unit'> cup/s </span>
                    <span className='ingredient-name'>Milk</span>
                </li>
        </ul>
        <ol className='recipe-directions'>
            <h3>Directions</h3>
                <li key={'huh'} className="recipe-direction">
                    This is step number one and also the final step
                </li>
        </ol>
    </li>
        </ul>
    </main>
  )
}

export default Dashboard