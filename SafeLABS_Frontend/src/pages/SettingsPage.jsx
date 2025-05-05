
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../components/common/settingsPageStyles.css'; 
import { logout, selectRole } from "../features/auth/authSlice";


const SettingsPage = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const role = useSelector(selectRole);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      capacityWarnings: true,
      securityAlerts: true
    },
    display: {
      darkMode: true,
      showUserIds: false,
      compactView: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      autoLogout: true
    },
    labSettings: {
      maxCapacity: 25,
      requireCheckout: true,
      autoCheckoutTime: 12
    }
  });

  // Handle settings change
  const handleSettingChange = (category, setting, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    });
  };

  // Handle save settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  // Toggle switch component 
  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="safelabs-settings-flex-row safelabs-settings-mb-4">
      <label className="safelabs-settings-toggle-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="safelabs-settings-sr-only"
        />
        <div className="safelabs-settings-toggle-track"></div>
        <span className="safelabs-settings-toggle-text">{label}</span>
      </label>
    </div>
  );

  // Logout Confirmation Modal
  const LogoutConfirmModal = () => {
    if (!showLogoutConfirm) return null;
    
    return (
      <div className="safelabs-logout-modal-overlay">
        <div className="safelabs-logout-modal">
          <h3 className="safelabs-logout-modal-title">Confirm Logout</h3>
          <p className="safelabs-logout-modal-text">Are you sure you want to logout?</p>
          <div className="safelabs-logout-modal-buttons">
            <button 
              className="safelabs-logout-modal-cancel" 
              onClick={() => setShowLogoutConfirm(false)}
            >
              Cancel
            </button>
            <button 
              className="safelabs-logout-modal-confirm" 
              onClick={() => {
                setShowLogoutConfirm(false);
                handleLogout();
              }}
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
      <div className="safelabs-settings-container">
        <div className="safelabs-settings-header-container">
          <h1 className="safelabs-settings-header">Settings</h1>
          <button 
            className="safelabs-logout-button"
            onClick={() => setShowLogoutConfirm(true)}
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="safelabs-logout-button-text">Logout</span>
          </button>
        </div>
        
        <LogoutConfirmModal />
        
        {saveSuccess && (
          <div className="safelabs-settings-success-message">
            Settings saved successfully!
          </div>
        )}
        
        <form onSubmit={handleSaveSettings}>
          {/* Notifications Settings */}
          <div className="safelabs-settings-card safelabs-settings-mb-8">
            <h2 className="safelabs-settings-subheader">Notifications</h2>
            
            <div className="safelabs-settings-grid">
              <ToggleSwitch 
                checked={settings.notifications.emailAlerts} 
                onChange={() => handleSettingChange('notifications', 'emailAlerts', !settings.notifications.emailAlerts)}
                label="Email Alerts"
              />
              
              <ToggleSwitch 
                checked={settings.notifications.smsAlerts} 
                onChange={() => handleSettingChange('notifications', 'smsAlerts', !settings.notifications.smsAlerts)}
                label="SMS Alerts"
              />
              
              <ToggleSwitch 
                checked={settings.notifications.capacityWarnings} 
                onChange={() => handleSettingChange('notifications', 'capacityWarnings', !settings.notifications.capacityWarnings)}
                label="Capacity Warning Alerts"
              />
              
              <ToggleSwitch 
                checked={settings.notifications.securityAlerts} 
                onChange={() => handleSettingChange('notifications', 'securityAlerts', !settings.notifications.securityAlerts)}
                label="Security Breach Alerts"
              />
            </div>
          </div>
          
          {/* Display Settings */}
          <div className="safelabs-settings-card safelabs-settings-mb-8">
            <h2 className="safelabs-settings-subheader">Display Preferences</h2>
            
            <div className="safelabs-settings-grid">
              <ToggleSwitch 
                checked={settings.display.darkMode} 
                onChange={() => handleSettingChange('display', 'darkMode', !settings.display.darkMode)}
                label="Dark Mode"
              />
              
              <ToggleSwitch 
                checked={settings.display.showUserIds} 
                onChange={() => handleSettingChange('display', 'showUserIds', !settings.display.showUserIds)}
                label="Show User IDs"
              />
              
              <ToggleSwitch 
                checked={settings.display.compactView} 
                onChange={() => handleSettingChange('display', 'compactView', !settings.display.compactView)}
                label="Compact View"
              />
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="safelabs-settings-card safelabs-settings-mb-8">
            <h2 className="safelabs-settings-subheader">Security Settings</h2>
            
            <div className="safelabs-settings-grid">
              <ToggleSwitch 
                checked={settings.security.twoFactorAuth} 
                onChange={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                label="Two-Factor Authentication"
              />
              
              <ToggleSwitch 
                checked={settings.security.autoLogout} 
                onChange={() => handleSettingChange('security', 'autoLogout', !settings.security.autoLogout)}
                label="Auto Logout on Inactivity"
              />
              
              <div className="safelabs-settings-mb-4">
                <label className="safelabs-settings-input-label">Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  min="5" 
                  max="120" 
                  value={settings.security.sessionTimeout} 
                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="safelabs-settings-input"
                />
              </div>
            </div>
          </div>
          
          {/* lab configuration settings can be accessed by Admin only */}
          {role === "Admin" && (
            <div className="safelabs-settings-card safelabs-settings-mb-8">
              <h2 className="safelabs-settings-subheader">Lab Configuration</h2>
              
              <div className="safelabs-settings-grid">
                <div className="safelabs-settings-mb-4">
                  <label className="safelabs-settings-input-label">Maximum Lab Capacity</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="100" 
                    value={settings.labSettings.maxCapacity} 
                    onChange={(e) => handleSettingChange('labSettings', 'maxCapacity', parseInt(e.target.value))}
                    className="safelabs-settings-input"
                  />
                </div>
                
                <div className="safelabs-settings-mb-4">
                  <label className="safelabs-settings-input-label">Auto Checkout After (hours)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="24" 
                    value={settings.labSettings.autoCheckoutTime} 
                    onChange={(e) => handleSettingChange('labSettings', 'autoCheckoutTime', parseInt(e.target.value))}
                    className="safelabs-settings-input"
                  />
                </div>
                
                <ToggleSwitch 
                  checked={settings.labSettings.requireCheckout} 
                  onChange={() => handleSettingChange('labSettings', 'requireCheckout', !settings.labSettings.requireCheckout)}
                  label="Require Manual Checkout"
                />
              </div>
            </div>
          )}

          
          {/* Save Button */}
          <div className="safelabs-settings-button-container">
            <button 
              type="submit" 
              className="safelabs-settings-save-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
        
        {error && <p className="safelabs-error-message safelabs-settings-mt-4">Error: {error}</p>}
      </div>
    </div>
  );
};

export default SettingsPage;