import React from 'react';

function Recipe({title, calories, img}) {
  return (
      <div>
          <img src={img} alt="" className="FoodPic"/>
          <h1 className="FoodTitle">{title}</h1>
          <p className="FoodCalories">Calories: {Math.floor(calories)}</p>
      </div>
  )
}

export default Recipe;