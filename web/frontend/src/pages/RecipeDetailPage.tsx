import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaPlay, FaUtensils } from 'react-icons/fa';
import { recipeApi } from '../api';
import { Recipe } from '../types';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadRecipe(parseInt(id));
    }
  }, [id]);

  const loadRecipe = async (recipeId: number) => {
    try {
      const response = await recipeApi.getById(recipeId);
      setRecipe(response.data);
      setServings(response.data.defaultServings);
    } catch (error) {
      console.error('Failed to load recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCooking = () => {
    navigate(`/cooking/${id}?servings=${servings}`);
  };

  if (loading) {
    return (
      <div className="recipe-detail-page page">
        <div className="loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-page page">
        <div className="container">
          <h2>Recipe not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="recipe-header-section"
        >
          <div className="recipe-title-area">
            <h1>{recipe.name}</h1>
            <span className="country-flag-xl">{recipe.country.flagEmoji}</span>
          </div>
          <p className="recipe-subtitle">{recipe.description}</p>

          <div className="recipe-stats">
            <div className="stat-item">
              <FaClock className="stat-icon" />
              <div>
                <div className="stat-value">{recipe.totalTimeMinutes} min</div>
                <div className="stat-label">Total Time</div>
              </div>
            </div>
            <div className="stat-item">
              <FaUtensils className="stat-icon" />
              <div>
                <div className="stat-value">{recipe.difficultyLevel}</div>
                <div className="stat-label">Difficulty</div>
              </div>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div>
                <div className="stat-value">{recipe.defaultServings}</div>
                <div className="stat-label">Default Servings</div>
              </div>
            </div>
          </div>

          <div className="categories-list">
            {recipe.categories.map((cat) => (
              <span key={cat.id} className="category-badge" style={{ background: cat.colorCode }}>
                {cat.iconName} {cat.name}
              </span>
            ))}
          </div>
        </motion.div>

        {recipe.culturalContext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="cultural-context card"
          >
            <h3>🌍 Cultural Context</h3>
            <p>{recipe.culturalContext}</p>
          </motion.div>
        )}

        <div className="recipe-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="ingredients-section card"
          >
            <h2>Ingredients</h2>

            <div className="servings-control">
              <label>Servings:</label>
              <div className="servings-buttons">
                <button onClick={() => setServings(Math.max(1, servings - 1))}>-</button>
                <span>{servings}</span>
                <button onClick={() => setServings(servings + 1)}>+</button>
              </div>
            </div>

            <ul className="ingredients-list">
              {recipe.ingredients.map((ri) => {
                const scaledQty = (ri.quantity * servings) / recipe.defaultServings;
                return (
                  <li key={ri.id} className={ri.isOptional ? 'optional' : ''}>
                    <span className="ingredient-quantity">
                      {scaledQty.toFixed(2)} {ri.unit}
                    </span>
                    <span className="ingredient-name">
                      {ri.ingredient.name}
                      {ri.preparation && ` (${ri.preparation})`}
                    </span>
                    {ri.isOptional && <span className="optional-tag">Optional</span>}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="instructions-section card"
          >
            <h2>Instructions</h2>
            <div className="steps-list">
              {recipe.steps.map((step) => (
                <div key={step.id} className="step-item">
                  <div className="step-number">{step.orderIndex}</div>
                  <div className="step-content">
                    <p>{step.instruction}</p>
                    {step.hasTimer && (
                      <div className="step-timer-info">
                        ⏱️ Timer: {step.timerLabel || 'Set timer'} for{' '}
                        {Math.floor(step.timerSeconds! / 60)} min {step.timerSeconds! % 60} sec
                      </div>
                    )}
                    {step.tips && <div className="step-tip">💡 Tip: {step.tips}</div>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="start-cooking-section"
        >
          <button onClick={handleStartCooking} className="btn btn-primary btn-large">
            <FaPlay />
            Start Cooking Mode
          </button>
          <p className="cooking-mode-hint">
            Enter Focus Mode with parallel timers and step-by-step guidance
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
