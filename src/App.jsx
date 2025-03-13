import { useState, useEffect } from 'react';
import './components/Weather.css';
import { getData } from './services/WeatherService'
import Weather from './components/Weather';
import Search from './components/Search';


const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset weather data
  const resetData = () => {
    setWeatherData({});
  }

  // Fetch weather data when city changes
  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;
      
      setIsLoading(true);
      
      try {
        const cData = await getData(city);
        if (cData) {
          setWeatherData(cData);
        } else {
          throw new Error(`No weather data found for ${city}`);
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
        setWeatherData({});
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [city]);

  return (
    <div className="app">
      <header className="App-header">
        <h1>Weather Now!</h1>
        <br />
        <p>Real-time weather information</p>
        <br />
        
        {isLoading ? (
          <div className="loading">Loading weather data...</div>
        ) : Object.keys(weatherData).length !== 0 ? (
          <Weather data={weatherData} resetData={resetData} />
        ) : (
          <Search setCity={setCity} />
        )}
      </header>
    </div>
  );
}

export default App;