import React from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.name} />
        <div className="recipe-cuisine-badge">{recipe.cuisine}</div>
      </div>
      <div className="recipe-content">
        <h3>{recipe.name}</h3>
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="icon">⏱️</span>
            <span>{recipe.time} min</span>
          </div>
          <div className="meta-item">
            <span className="icon">⭐</span>
            <span>{recipe.rating}</span>
          </div>
          <div className="meta-item">
            <span className="icon">👥</span>
            <span>{recipe.servings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
