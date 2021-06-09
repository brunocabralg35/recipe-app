import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { GiCook } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function Home() {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const APP_ID = "c2798af2";
  const APP_KEY = "5a9f707b40b2c7b32331f2cb75ade7d1";
  const ReqURL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(ReqURL);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    setLoading(true)
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  },[query])

  return (
      <div className="App">
        <h1 className="logo">
          Bruno's Recipes <GiCook size={40} color={"#272626"} />
        </h1>
        <form className="search-form" onSubmit={getSearch}>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          ></input>
          <button className="search-btn" type="submit">
            <BsSearch color={"fff"} size={20} />
          </button>
        </form>
        <h1 className="search-any">Search any recipe you want with us!</h1>

        {(loading) ? <div className="loading-home"><BiLoaderAlt/></div> :  <div className="Recipes">
          {recipes.map((recipe, index) => (
            <div key={index} className="RecipeBox" onClick={
                ()=>{
                    history.push(`/${query}/${index}`);
                }
            }>
              <Recipe
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                img={recipe.recipe.image}
              />
            </div>
          ))}
        </div> }

       
      </div>
  );
}

export default Home;
