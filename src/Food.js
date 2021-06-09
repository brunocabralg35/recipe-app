import React, { useEffect, useState } from "react";
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function Food() {
  let { query } = useParams();
  let { key } = useParams();
  let history = useHistory();
  const APP_ID = "c2798af2";
  const APP_KEY = "5a9f707b40b2c7b32331f2cb75ade7d1";
  const ReqURL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [name, setName] = useState();
  const [pic, setPic] = useState();
  const [ing, setIng] = useState([]);
  const [cuisine, setCuisine] = useState();
  const [calories, setCalories] = useState();
  const [totalTime, setTotalTime] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  },[])

  const getRecipes = async () => {
    const response = await fetch(ReqURL);
    const data = await response.json();
    setName(data.hits[key].recipe.label);
    setPic(data.hits[key].recipe.image);
    setIng(data.hits[key].recipe.ingredients);
    setCuisine(data.hits[key].recipe.cuisineType);
    setCalories(Math.floor(data.hits[key].recipe.calories));
    setTotalTime(data.hits[key].recipe.totalTime);
  };

  function verificaTempo(tempo){
    if (tempo !== 0){
        return true;
    }else{
        return false;
    }
  }

  return (loading) ? <div className="FoodApp">
  <div className="FoodBox">
    <div className="loading"><BiLoaderAlt/></div>
  </div>
</div> : (
    <div className="FoodApp">
      <div className="FoodBox">
        <img src={pic} className="img" />
        <h1 className="FdTitle">{name}</h1>
        <p className="FdDescription">
          A delicious {cuisine} recipe containing {calories} calories, with a reasonable time 
          to prepare, it will only take {(verificaTempo(totalTime)) ? totalTime : "a few"} minutes!
        </p>

        <div className="ingredientsBox">
          <h2 className="IngTitle">Ingredients</h2>
          {ing.map((i, key) => {
            return <li>{i.text}</li>;
          })}
        </div>
        <button className="menu-btn" onClick={()=>{
            history.push('/');
        }}>Home</button>
      </div>
    </div>
  );
}

export default Food;
