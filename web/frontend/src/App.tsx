import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlavorMapPage from './pages/FlavorMapPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CookingModePage from './pages/CookingModePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flavor-map" element={<FlavorMapPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/cooking/:id" element={<CookingModePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
