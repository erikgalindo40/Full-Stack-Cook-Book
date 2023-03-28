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
  const [deletePending, setDeletePending] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onDeleteRecipe = (e, id) => {
    e.preventDefault()
    setDeletePending(true)
    const user = JSON.parse(localStorage.getItem('user'))

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
      setDeletePending(false)
      setDeleteSuccess(true)
      setRecipeList(prevState=>prevState.filter(recipe=>recipe._id!==data.id))
    })
    .catch(error=>{
      setDeletePending(false)
      setDeleteError(true)
      error.json().then(err=>setErrorMessage(err))
    })
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

  }, [navigate, editRecipeModal])
  

  return (
    <main className='dashboard-container'>
      <RecipeForm recipeEditInfo={recipeModalInfo} setRecipeModalInfo={setRecipeModalInfo}/>
      {deletePending&&<div className='recipe-modal'><p>Deleting...</p></div>}
      {deleteSuccess&&<div className='recipe-modal'><button className='close-modal-button' onClick={()=>setDeleteSuccess(false)}><ImCross/></button><p>Delete Successful</p></div>}
      {deleteError&&<div className='recipe-modal'><button className='close-modal-button' onClick={()=>setDeleteError(false)}><ImCross/></button><p>Delete Error. Try again Later. {errorMessage}</p></div>}
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