import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RecipeForm from '../components/RecipeForm'
import Recipe from '../components/Recipe'
import { ImCross } from 'react-icons/im'

function Dashboard() {
  const navigate = useNavigate()
  const [recipeList, setRecipeList] = useState([])
  const [recipeModalInfo, setRecipeModalInfo] = useState({})

  useEffect(() => {
    console.log('ran effect')
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
      <RecipeForm recipeEditInfo={recipeModalInfo} setRecipeModalInfo={setRecipeModalInfo}/>
      <ul className='recipes'>
        {recipeList.map(recipe=>(
          <Recipe setRecipeList={setRecipeList} setRecipeModalInfo={setRecipeModalInfo} key={recipe._id} recipeID={recipe._id} recipeName={recipe.name} ingredients={recipe.ingredients} directions={recipe.directions} time={recipe.time} description={recipe.description}/>
        ))}
      </ul>
    </main>
  )
}

export default Dashboard