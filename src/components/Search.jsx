import React, { useState } from 'react';

const Search = ({ setCity }) => {
  const [userInput, setUserInput] = useState('');
  const [showLocationError, setShowLocationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Function to convert coordinates to city name
  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      // Replace YOUR_API_KEY with your actual API key
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=YOUR_API_KEY`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        return data[0].name;
      }
      throw new Error("No location found for these coordinates");
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      throw error;
    }
  };

  // Get user location
  const getUserLocation = () => {
    // Hide any previous errors
    setShowLocationError(false);
    setErrorMessage('');
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by this browser");
      setShowLocationError(true);
      setIsLoadingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const cityName = await getCityFromCoordinates(latitude, longitude);
          setCity(cityName);
          setIsLoadingLocation(false);
        } catch (err) {
          setErrorMessage(`Error getting location: ${err.message}`);
          setShowLocationError(true);
          setIsLoadingLocation(false);
        }
      },
      (err) => {
        let errorMessage;
        
        switch(err.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Location access denied. Please enable location permissions in your browser settings.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Your current location is unavailable. Please try again later.";
            break;
          case 3: // TIMEOUT
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = `Geolocation error: ${err.message}`;
        }
        
        setErrorMessage(errorMessage);
        setShowLocationError(true);
        setIsLoadingLocation(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setShowLocationError(false); 
      setCity(userInput);
      setUserInput('');
    }
  };

  return (
    <div className='search-section'>
      <form className='search-bar' onSubmit={handleSubmit}>
        <input
          id='city-name'
          name='cityName'
          placeholder='Enter City Name'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          <span className="material-symbols-rounded">search</span>
        </button>
      </form>
      
      <button 
        className="location-btn" 
        onClick={getUserLocation}
        disabled={isLoadingLocation}
      >
        {isLoadingLocation ? 'Getting location...' : 'Use My Location'}
      </button>
      
      {showLocationError && (
        <div className="error location-error">
          <p>{errorMessage}</p>
          <p className="error-help">Please search for a city manually or try again.</p>
        </div>
      )}
    </div>
  );
};

export default Search;