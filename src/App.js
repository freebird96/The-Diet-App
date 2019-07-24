import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
import { createDecipher } from 'crypto';

const App = () => {

  const APP_ID = "607dbaa0";
  const APP_KEY = "620af0d5669f22a409cd547b49f906fd";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  useEffect(() => {

    getRecipes();

  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">

      <h1 className="header"> The Diet App</h1>
      <p className="para">This website gives you information about the ingredients used in the making of the healthy food that you wish to make and helps you decide on the items to be purchased for the making. Search the ingredients for your favorite snack.</p>

      <form onSubmit = {getSearch} className = "search-form">
        <input className = "search-bar" type="text" value = {search} onChange = {updateSearch}/>
        <button className="search-button" type = "submit">Search</button>
      </form>
      <div className = "recipes">
        {recipes.map( recipe => (

              <Recipe 
              key = {recipe.recipe.label}
              title = {recipe.recipe.label}
              calories = {recipe.recipe.calories}
              image = {recipe.recipe.image}
              ingredients = {recipe.recipe.ingredients}
            />                
        ))}
      </div>     
    </div>
  )
}

export default App;
