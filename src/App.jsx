import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [recipe, setRecipe] = useState({});

  const fetchRandomRecipe = () => {
    fetch(BASE_URL + '/recipes')
      .then((response) => response.json())
      .then((data) => {
        const usersList = data['recipes'];

        const randomIndex = Math.floor(Math.random() * usersList.length);

        setRecipe(usersList[randomIndex]);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchRandomRecipe();
  });


  return (
    <>
      <section id="center">
        <div className="hero">
          {
            recipe.image ? <img src={recipe.image} className="base" width="170" height="179" alt="" /> : "Loading .."
          }
        </div>
        <div>
          <h1>{recipe.name ?? 'Recepie Name'}</h1>
          <p>
            instructions:
          </p>
          <ul>
            {
              (recipe.instructions ?? []).map((i, index) => {
                return <li key={index}>{i}</li>
              })
            }
          </ul>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => fetchRandomRecipe()}
        >
          Refresh Recepie
        </button>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
