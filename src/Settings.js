import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    id: { visible: true, width: 100, backgroundColor: '#ffffff' },
    title: { visible: true, width: 200, backgroundColor: '#ffffff' },
    price: { visible: true, width: 150, backgroundColor: '#ffffff' },
    description: { visible: true, width: 300, backgroundColor: '#ffffff' }
  });

  const history = useNavigate();

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (column, field, value) => {
    // Convert value to number if it's a numeric field (like width)
    const newValue = field === 'width' ? Number(value) : value;
  
    setSettings(prevSettings => ({
      ...prevSettings,
      [column]: { ...prevSettings[column], [field]: newValue }
    }));
  };
  
  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    history('/'); // Navigate to the homepage after saving
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif', backgroundColor: '#2e2e2e', color: '#f1f1f1' }}>
      <h1 style={{ textAlign: 'center', color: '#d16c92' }}>Настройки вывода таблицы</h1>
      <div style={{ marginBottom: '30px' }}>
        {Object.keys(settings).map(column => (
          <div key={column} style={{ marginBottom: '20px', backgroundColor: '#444', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ color: '#d16c92' }}>{column.toUpperCase()}</h3>
            <label style={{ color: '#bbb' }}>
              Видимость:
              <input
                type="checkbox"
                checked={settings[column].visible}
                onChange={e => handleChange(column, 'visible', e.target.checked)}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              />
            </label>
            <br />
            <label style={{ color: '#bbb' }}>
              Ширина:
              <input
                type="number"
                value={settings[column].width}
                onChange={e => handleChange(column, 'width', e.target.value)}
                style={{
                  marginLeft: '10px',
                  padding: '8px',
                  borderRadius: '4px',
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  color: '#fff',
                  width: '100px',
                  maxWidth: '150px'
                }}
              />
            </label>
            <br />
            <label style={{ color: '#bbb' }}>
              Фоновый цвет:
              <input
                type="color"
                value={settings[column].backgroundColor}
                onChange={e => handleChange(column, 'backgroundColor', e.target.value)}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              />
            </label>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 20px',
            backgroundColor: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
}

export default Settings;
