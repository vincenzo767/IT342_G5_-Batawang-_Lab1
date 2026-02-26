import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { countryApi, recipeApi } from '../api';
import { Country, Recipe } from '../types';
import './FlavorMapPage.css';

// Continent colors for the flat map
const continentColors: Record<string, string> = {
  'Asia': '#ec4899',
  'Europe': '#f59e0b',
  'Africa': '#06b6d4',
  'North America': '#14b8a6',
  'South America': '#8b5cf6',
  'Oceania': '#06b6d4',
};

// Mock data for when backend is not available
const mockContinents: Record<string, Country[]> = {
  'Asia': [
    { id: 1, name: 'Japan', code: 'JP', continent: 'Asia', flagEmoji: '🇯🇵', latitude: 36.2048, longitude: 138.2529, description: 'Island nation with unique cuisine' },
    { id: 2, name: 'Thailand', code: 'TH', continent: 'Asia', flagEmoji: '🇹🇭', latitude: 15.8700, longitude: 100.9925, description: 'Southeast Asian spice hub' },
    { id: 3, name: 'India', code: 'IN', continent: 'Asia', flagEmoji: '🇮🇳', latitude: 20.5937, longitude: 78.9629, description: 'Land of diverse spices' },
    { id: 4, name: 'South Korea', code: 'KR', continent: 'Asia', flagEmoji: '🇰🇷', latitude: 35.9078, longitude: 127.7669, description: 'Vibrant modern cuisine' },
    { id: 5, name: 'Vietnam', code: 'VN', continent: 'Asia', flagEmoji: '🇻🇳', latitude: 14.0583, longitude: 108.2772, description: 'Fresh and balanced flavors' },
  ],
  'Europe': [
    { id: 6, name: 'France', code: 'FR', continent: 'Europe', flagEmoji: '🇫🇷', latitude: 46.2276, longitude: 2.2137, description: 'Culinary capital of the world' },
    { id: 7, name: 'Italy', code: 'IT', continent: 'Europe', flagEmoji: '🇮🇹', latitude: 41.8719, longitude: 12.5674, description: 'Pasta and pizza paradise' },
    { id: 8, name: 'Spain', code: 'ES', continent: 'Europe', flagEmoji: '🇪🇸', latitude: 40.4637, longitude: -3.7492, description: 'Mediterranean flavors' },
    { id: 9, name: 'Greece', code: 'GR', continent: 'Europe', flagEmoji: '🇬🇷', latitude: 39.0742, longitude: 21.8243, description: 'Ancient Mediterranean tradition' },
    { id: 10, name: 'Germany', code: 'DE', continent: 'Europe', flagEmoji: '🇩🇪', latitude: 51.1657, longitude: 10.4515, description: 'Hearty and rich flavors' },
  ],
  'Africa': [
    { id: 11, name: 'Egypt', code: 'EG', continent: 'Africa', flagEmoji: '🇪🇬', latitude: 26.8206, longitude: 30.8025, description: 'Ancient culinary traditions' },
    { id: 12, name: 'Morocco', code: 'MA', continent: 'Africa', flagEmoji: '🇲🇦', latitude: 31.7917, longitude: -7.0926, description: 'Spiced tagines and couscous' },
    { id: 13, name: 'South Africa', code: 'ZA', continent: 'Africa', flagEmoji: '🇿🇦', latitude: -30.5595, longitude: 22.9375, description: 'Fusion of cultures' },
    { id: 14, name: 'Ethiopia', code: 'ET', continent: 'Africa', flagEmoji: '🇪🇹', latitude: 9.1450, longitude: 40.4897, description: 'Unique spice blends' },
  ],
  'North America': [
    { id: 15, name: 'Mexico', code: 'MX', continent: 'North America', flagEmoji: '🇲🇽', latitude: 23.6345, longitude: -102.5528, description: 'Vibrant and complex flavors' },
    { id: 16, name: 'United States', code: 'US', continent: 'North America', flagEmoji: '🇺🇸', latitude: 37.0902, longitude: -95.7129, description: 'Diverse regional cuisines' },
    { id: 17, name: 'Canada', code: 'CA', continent: 'North America', flagEmoji: '🇨🇦', latitude: 56.1304, longitude: -106.3468, description: 'Fresh and local ingredients' },
  ],
  'South America': [
    { id: 18, name: 'Peru', code: 'PE', continent: 'South America', flagEmoji: '🇵🇪', latitude: -9.1900, longitude: -75.0152, description: 'Ancient Andean cuisine' },
    { id: 19, name: 'Brazil', code: 'BR', continent: 'South America', flagEmoji: '🇧🇷', latitude: -14.2350, longitude: -51.9253, description: 'Tropical and bold flavors' },
    { id: 20, name: 'Argentina', code: 'AR', continent: 'South America', flagEmoji: '🇦🇷', latitude: -38.4161, longitude: -63.6167, description: 'Grilled meats and wine culture' },
    { id: 21, name: 'Colombia', code: 'CO', continent: 'South America', flagEmoji: '🇨🇴', latitude: 4.5709, longitude: -74.2973, description: 'Rich coffee and tropical fruits' },
  ],
  'Oceania': [
    { id: 22, name: 'Australia', code: 'AU', continent: 'Oceania', flagEmoji: '🇦🇺', latitude: -25.2744, longitude: 133.7751, description: 'Modern and indigenous fusion' },
    { id: 23, name: 'New Zealand', code: 'NZ', continent: 'Oceania', flagEmoji: '🇳🇿', latitude: -40.9006, longitude: 174.8860, description: 'Pacific seafood and meats' },
  ],
};

const FlavorMapPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Record<string, Country[]>>({});
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await countryApi.getGroupedByContinent();
      setContinents(response.data);
      const allCountries = Object.values(response.data).flat();
      setCountries(allCountries);
    } catch (error) {
      console.error('Failed to load countries, using mock data:', error);
      // Use mock data when backend is not available
      setContinents(mockContinents);
      const allCountries = Object.values(mockContinents).flat();
      setCountries(allCountries);
    } finally {
      setLoading(false);
    }
  };

  const handleContinentClick = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountry(null);
    setRecipes([]);
  };

  const handleCountryClick = async (country: Country) => {
    setSelectedCountry(country);
    setLoading(true);
    try {
      const response = await recipeApi.getByCountryCode(country.code);
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes, using mock data:', error);
      // Use mock recipes for demo
      const mockRecipes: Recipe[] = [
        {
          id: 1,
          name: `${country.name} Classic Dish`,
          description: `Traditional recipe from ${country.name}`,
          country: country,
          categories: [],
          prepTimeMinutes: 15,
          cookTimeMinutes: 30,
          totalTimeMinutes: 45,
          defaultServings: 4,
          difficultyLevel: 'Medium',
          culturalContext: `A beloved dish from ${country.name}`,
          ingredients: [],
          steps: [],
        },
        {
          id: 2,
          name: `Modern ${country.name} Fusion`,
          description: `Contemporary take on ${country.name} flavors`,
          country: country,
          categories: [],
          prepTimeMinutes: 20,
          cookTimeMinutes: 40,
          totalTimeMinutes: 60,
          defaultServings: 4,
          difficultyLevel: 'Hard',
          culturalContext: `A modern interpretation of ${country.name} cuisine`,
          ingredients: [],
          steps: [],
        },
      ];
      setRecipes(mockRecipes);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  const availableContinents = Object.keys(continents).sort();
  const displayedCountries = selectedContinent
    ? continents[selectedContinent] || []
    : countries;

  return (
    <div className="flavor-map-page page">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-title"
        >
          🌍 Global Flavor Map
        </motion.h1>

        <div className="flavor-map-layout">
          {/* Flat Map Section */}
          <div className="globe-section">
            <div className="flat-map">
              <div className="map-header">
                <h2>World Cuisines</h2>
                <p>Click continents below to explore</p>
              </div>
              
              <div className="continents-visual">
                {availableContinents.map((continent) => {
                  const countryCount = continents[continent]?.length || 0;
                  const isSelected = selectedContinent === continent;
                  const color = continentColors[continent] || '#667eea';
                  
                  return (
                    <motion.button
                      key={continent}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className={`continent-visual ${isSelected ? 'active' : ''}`}
                      style={{
                        backgroundColor: isSelected ? color : 'rgba(255, 255, 255, 0.05)',
                        borderColor: color,
                      }}
                      onClick={() => handleContinentClick(continent)}
                    >
                      <span className="continent-label">{continent.replace(/_/g, ' ')}</span>
                      <span className="continent-count">{countryCount} 🍽️</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="map-footer">
                <p>📍 Total Countries: {countries.length}</p>
                <p>🍽️ Click continent buttons above to start exploring</p>
              </div>
            </div>
          </div>

          {/* Selection & Recipes Section */}
          <div className="selection-section">
            <div className="section-intro">
              <p>Explore the world's most delicious cuisines</p>
            </div>

            {displayedCountries.length > 0 && (
              <div className="countries-section">
                <h3>
                  {selectedContinent ? `Countries in ${selectedContinent.replace(/_/g, ' ')}` : 'All Countries'}
                  <span className="count-badge">{displayedCountries.length}</span>
                </h3>
                <div className="countries-grid">
                  {displayedCountries.map((country) => (
                    <motion.div
                      key={country.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`country-card ${selectedCountry?.id === country.id ? 'selected' : ''}`}
                      onClick={() => handleCountryClick(country)}
                    >
                      <span className="country-flag-large">{country.flagEmoji}</span>
                      <h4>{country.name}</h4>
                      {country.description && <p className="country-desc">{country.description}</p>}
                      <span className="click-hint">Click to view recipes →</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedCountry && (
              <div className="recipes-section">
                <h3>🍳 Recipes from {selectedCountry.name} {selectedCountry.flagEmoji}</h3>
                {loading ? (
                  <div className="loading">
                    <div className="spinner" />
                    <p>Loading recipes...</p>
                  </div>
                ) : recipes.length > 0 ? (
                  <div className="recipes-grid">
                    {recipes.map((recipe) => (
                      <motion.div
                        key={recipe.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="recipe-card-mini card"
                        onClick={() => handleRecipeClick(recipe.id)}
                      >
                        <h4>{recipe.name}</h4>
                        <p>{recipe.description}</p>
                        <div className="recipe-quick-info">
                          <span>⏱️ {recipe.totalTimeMinutes} min</span>
                          <span className={`badge badge-${recipe.difficultyLevel.toLowerCase()}`}>
                            {recipe.difficultyLevel}
                          </span>
                        </div>
                        <span className="click-hint">Click to view full recipe →</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="no-recipes">
                    <p>No recipes available yet for {selectedCountry.name}</p>
                    <p className="no-recipes-hint">Try selecting a different country!</p>
                  </div>
                )}
              </div>
            )}

            {!selectedCountry && displayedCountries.length > 0 && (
              <div className="recipes-section empty-state">
                <p>👈 Select a country to view its delicious recipes!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorMapPage;
