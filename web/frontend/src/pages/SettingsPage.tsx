import { useState } from 'react';
import './LearningWorkspace.css';

const SettingsPage = () => {
  const [unitSystem, setUnitSystem] = useState('METRIC');
  const [skillLevel, setSkillLevel] = useState('BEGINNER');
  const [goalReminder, setGoalReminder] = useState(true);

  return (
    <div className="workspace-page page">
      <div className="container">
        <div className="workspace-header card">
          <h1>Learning Settings</h1>
          <p>Adjust your culinary learning preferences for a better guided experience.</p>
        </div>

        <div className="workspace-grid grid grid-2">
          <div className="card workspace-section">
            <h2>Cooking Preferences</h2>
            <div className="setting-row">
              <label htmlFor="unitSystem">Unit System</label>
              <select id="unitSystem" value={unitSystem} onChange={(e) => setUnitSystem(e.target.value)}>
                <option value="METRIC">Metric</option>
                <option value="IMPERIAL">Imperial</option>
              </select>
            </div>
            <div className="setting-row">
              <label htmlFor="skillLevel">Skill Level</label>
              <select id="skillLevel" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
          </div>

          <div className="card workspace-section">
            <h2>Notifications</h2>
            <div className="setting-row checkbox-row">
              <label htmlFor="goalReminder">Weekly learning goal reminders</label>
              <input
                id="goalReminder"
                type="checkbox"
                checked={goalReminder}
                onChange={(e) => setGoalReminder(e.target.checked)}
              />
            </div>
            <p className="settings-note">Settings are stored for this session and are ready for backend persistence integration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
