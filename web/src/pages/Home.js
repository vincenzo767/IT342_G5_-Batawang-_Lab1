import React, { useState } from 'react';
import { recipesData } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipesData.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingRecipes = recipesData.slice(0, 6);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome to <span className="synchef-logo">SynChef</span></h1>
          <p>AI-Powered Global Cooking Assistant with Real-Time Execution</p>
        </div>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="search-btn">Search</button>
        </div>
        <button className="explore-btn">🌍 Explore Global Flavor Map</button>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Real-Time Execution</h3>
            <p>Step-by-step guidance synchronized with your kitchen appliances.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Flavors</h3>
            <p>Access a world of recipes from every corner of the globe.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Assistant</h3>
            <p>Your personal chef powered by the latest AI for perfect results.</p>
          </div>
        </div>
      </section>

      {/* Search Results or Trending Recipes */}
      <section className="recipes-section">
        <div className="section-header">
          <h2>{searchTerm ? 'Search Results' : 'Trending Recipes'}</h2>
          {!searchTerm && <a href="#" className="view-all">View All</a>}
        </div>

        {searchTerm && filteredRecipes.length === 0 ? (
          <div className="no-results">
            <p>No recipes found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="reset-btn">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="recipes-grid">
            {(searchTerm ? filteredRecipes : trendingRecipes).map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedRecipe(null)}>✕</button>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} className="modal-image" />
            <div className="modal-details">
              <h2>{selectedRecipe.name}</h2>
              <p className="cuisine-type">{selectedRecipe.cuisine}</p>
              <p className="description">{selectedRecipe.description}</p>
              <div className="modal-meta">
                <div className="meta">
                  <span className="label">Time:</span> {selectedRecipe.time} minutes
                </div>
                <div className="meta">
                  <span className="label">Rating:</span> {selectedRecipe.rating} ⭐
                </div>
                <div className="meta">
                  <span className="label">Servings:</span> {selectedRecipe.servings}
                </div>
              </div>
              <button className="start-cooking-btn">Start Cooking</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
        <p>&copy; 2026 SynChef AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
