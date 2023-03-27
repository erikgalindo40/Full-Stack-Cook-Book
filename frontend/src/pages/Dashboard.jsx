import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RecipeForm from '../components/RecipeForm'
import Recipe from '../components/Recipe'
import { ImCross } from 'react-icons/im'

function Dashboard() {
  const navigate = useNavigate()
  const [recipeList, setRecipeList] = useState([])
  const [editRecipeModal, setEditRecipeModal] = useState(false)
  const [recipeModalInfo, setRecipeModalInfo] = useState({})
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false)

  const onDeleteRecipe = (e, id) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(`delete recipe with id of ${id}`)

    fetch(`/api/recipes/${id}`, {
      method:'DELETE',
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
      console.log(`delete successful of recipe with id of ${data.id}`)
    })
    .catch(error=>{
      error.json().then(err=>console.log(`ERROR: ${err}`))
    })
    setRecipeModalInfo({})
    setDeleteRecipeModal(false)
    setEditRecipeModal(false)
  }

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

  }, [navigate, recipeModalInfo])
  

  return (
    <main className='dashboard-container'>
      <RecipeForm recipeEditInfo={recipeModalInfo}/>
      {editRecipeModal&&<div className='recipe-modal'>
        <button onClick={()=>{setRecipeModalInfo({})
          setEditRecipeModal(!editRecipeModal)}} className='close-modal-button'><ImCross/></button>
        What would you like to do with {recipeModalInfo.recipe}?
        <button onClick={()=>{
          setEditRecipeModal(!editRecipeModal)}} className='recipe-modal-edit-button modal-button'>EDIT</button>
        <button onClick={()=>{
          setEditRecipeModal(!editRecipeModal)
          setDeleteRecipeModal(!deleteRecipeModal)}} className='recipe-modal-delete-button modal-button'>DELETE</button>
      </div>}
      {deleteRecipeModal&&<div className='recipe-modal'>
        <button onClick={()=>{setRecipeModalInfo({})
          setDeleteRecipeModal(!deleteRecipeModal)}} className='close-modal-button'><ImCross/></button>
        This is irreversible. <br/> Are you sure you want to <strong>DELETE</strong> {recipeModalInfo.recipe}?
        <button onClick={(e)=>onDeleteRecipe(e,recipeModalInfo.id)} className='recipe-modal-yes-delete-button modal-button'>Yes</button>
        <button onClick={()=>{setRecipeModalInfo({})
          setDeleteRecipeModal(!deleteRecipeModal)}} className='recipe-modal-no-delete-button modal-button'>No</button>
      </div>}
      <ul className='recipes'>
        {recipeList.map(recipe=>(
          <Recipe setRecipeModalInfo={setRecipeModalInfo} setEditRecipeModal={setEditRecipeModal} editRecipeModal={editRecipeModal} key={recipe._id} recipeID={recipe._id} recipeName={recipe.name} ingredients={recipe.ingredients} directions={recipe.directions} time={recipe.time} description={recipe.description}/>
        ))}
      </ul>
    </main>
  )
}

export default Dashboard