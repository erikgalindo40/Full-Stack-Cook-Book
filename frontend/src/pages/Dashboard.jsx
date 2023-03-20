import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import RecipeForm from '../components/RecipeForm'

function Dashboard() {
  const navigate = useNavigate()

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
      console.log(data)
    })
    .catch(error=>{
      error.json().then(err=>console.log(`ERROR: ${err}`))
    })

  }, [navigate])
  

  return (
    <main className='dashboard-container'>
      <RecipeForm />
        <ul className='recipes'>
          <li className="recipe">
            <div className="recipe-header">
              <h2 className='recipe-name'>Recipe Name</h2>
              <p className='recipe-time'>30 min.</p>
            </div>
            <p className='recipe-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, dolore optio! Reprehenderit neque in culpa eius</p>
            <h3>Ingredients</h3>
            <ul className="recipe-ingredients">
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Handful/s</span>
                <span className='ingredient-name'> Thyme</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Pinch/s</span>
                <span className='ingredient-name'> Sugar</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> Salt</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tbsp.</span>
                <span className='ingredient-name'> Season</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>3 </span>
                <span className='ingredient-unit'>lbs.</span>
                <span className='ingredient-name'> Chicken</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'></span>
                <span className='ingredient-name'> Bread</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1/3 </span>
                <span className='ingredient-unit'>Cup</span>
                <span className='ingredient-name'> Lemon</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> BBQ Sauce</span>
              </li>
            </ul>
            <ol className='recipe-directions'>
              <h3>Directions</h3>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae est harum esse blanditiis hic aliquid laborum. Repellat tempore in cumque, aperiam ipsa fuga nobis pariatur libero atque sequi et.</li>
              <li className="recipe-direction">Season Chicken</li>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia voluptates minima adipisci vitae reprehenderit, temporibus nihil commodi, vel voluptas reiciendis vero facere autem eveniet velit nobis cum magni, natus obcaecati?</li>
              <li className="recipe-direction">Enjoy Meal</li>
            </ol>
          </li>
          <li className="recipe">
            <div className="recipe-header">
              <h2 className='recipe-name'>Recipe Name</h2>
              <p className='recipe-time'>30 min.</p>
            </div>
            <p className='recipe-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, dolore optio! Reprehenderit neque in culpa eius</p>
            <h3>Ingredients</h3>
            <ul className="recipe-ingredients">
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Handful/s</span>
                <span className='ingredient-name'> Thyme</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Pinch/s</span>
                <span className='ingredient-name'> Sugar</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> Salt</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tbsp.</span>
                <span className='ingredient-name'> Season</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>3 </span>
                <span className='ingredient-unit'>lbs.</span>
                <span className='ingredient-name'> Chicken</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'></span>
                <span className='ingredient-name'> Bread</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1/3 </span>
                <span className='ingredient-unit'>Cup</span>
                <span className='ingredient-name'> Lemon</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> BBQ Sauce</span>
              </li>
            </ul>
            <ol className='recipe-directions'>
              <h3>Directions</h3>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae est harum esse blanditiis hic aliquid laborum. Repellat tempore in cumque, aperiam ipsa fuga nobis pariatur libero atque sequi et.</li>
              <li className="recipe-direction">Season Chicken</li>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia voluptates minima adipisci vitae reprehenderit, temporibus nihil commodi, vel voluptas reiciendis vero facere autem eveniet velit nobis cum magni, natus obcaecati?</li>
              <li className="recipe-direction">Enjoy Meal</li>
            </ol>
          </li>
          <li className="recipe">
            <div className="recipe-header">
              <h2 className='recipe-name'>Recipe Name</h2>
              <p className='recipe-time'>30 min.</p>
            </div>
            <p className='recipe-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, dolore optio! Reprehenderit neque in culpa eius</p>
            <h3>Ingredients</h3>
            <ul className="recipe-ingredients">
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Handful/s</span>
                <span className='ingredient-name'> Thyme</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Pinch/s</span>
                <span className='ingredient-name'> Sugar</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> Salt</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tbsp.</span>
                <span className='ingredient-name'> Season</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>3 </span>
                <span className='ingredient-unit'>lbs.</span>
                <span className='ingredient-name'> Chicken</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'></span>
                <span className='ingredient-name'> Bread</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1/3 </span>
                <span className='ingredient-unit'>Cup</span>
                <span className='ingredient-name'> Lemon</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> BBQ Sauce</span>
              </li>
            </ul>
            <ol className='recipe-directions'>
              <h3>Directions</h3>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae est harum esse blanditiis hic aliquid laborum. Repellat tempore in cumque, aperiam ipsa fuga nobis pariatur libero atque sequi et.</li>
              <li className="recipe-direction">Season Chicken</li>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia voluptates minima adipisci vitae reprehenderit, temporibus nihil commodi, vel voluptas reiciendis vero facere autem eveniet velit nobis cum magni, natus obcaecati?</li>
              <li className="recipe-direction">Enjoy Meal</li>
            </ol>
          </li>
          <li className="recipe">
            <div className="recipe-header">
              <h2 className='recipe-name'>Recipe Name</h2>
              <p className='recipe-time'>30 min.</p>
            </div>
            <p className='recipe-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, dolore optio! Reprehenderit neque in culpa eius</p>
            <h3>Ingredients</h3>
            <ul className="recipe-ingredients">
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Handful/s</span>
                <span className='ingredient-name'> Thyme</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Pinch/s</span>
                <span className='ingredient-name'> Sugar</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> Salt</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'>Tbsp.</span>
                <span className='ingredient-name'> Season</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>3 </span>
                <span className='ingredient-unit'>lbs.</span>
                <span className='ingredient-name'> Chicken</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1 </span>
                <span className='ingredient-unit'></span>
                <span className='ingredient-name'> Bread</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>1/3 </span>
                <span className='ingredient-unit'>Cup</span>
                <span className='ingredient-name'> Lemon</span>
              </li>
              <li className="recipe-ingredient">
                <span className='ingredient-amount'>2 </span>
                <span className='ingredient-unit'>Tsp.</span>
                <span className='ingredient-name'> BBQ Sauce</span>
              </li>
            </ul>
            <ol className='recipe-directions'>
              <h3>Directions</h3>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae est harum esse blanditiis hic aliquid laborum. Repellat tempore in cumque, aperiam ipsa fuga nobis pariatur libero atque sequi et.</li>
              <li className="recipe-direction">Season Chicken</li>
              <li className="recipe-direction">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia voluptates minima adipisci vitae reprehenderit, temporibus nihil commodi, vel voluptas reiciendis vero facere autem eveniet velit nobis cum magni, natus obcaecati?</li>
              <li className="recipe-direction">Enjoy Meal</li>
            </ol>
          </li>
        </ul>
    </main>
  )
}

export default Dashboard