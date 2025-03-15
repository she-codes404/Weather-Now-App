import React from 'react';
import './Weather.css';
import '../index.css';
import time from '../assets/images/time.svg';
import humidity from '../assets/images/humidity.svg';
import wind from '../assets/images/wind.svg';
import pressure from '../assets/images/pressure.svg';


const Weather = ({ data, resetData }) => {
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
  const convertUnix = (timestamp) => {
    const ts = new Date(timestamp * 1000);
    const hh = ts.getHours().toString().padEnd(2, '0');
    const mm = ts.getMinutes().toString().padEnd(2, '0');
    return `${hh}:${mm}`
  }

  const weatherDetails = {
    time: time,
    humidity: humidity,
    wind: wind,
    pressure: pressure
  }

    const backgroundImages = {
      Clear: 'linear-gradient(to right, #005c97, #363795)',
      Clouds: 'linear-gradient(to right, #b5b9ff, #2b2c49)',
      Rain: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
      Snow: 'linear-gradient(to right, #e6dada, #274046)',
      Thunderstorm: 'linear-gradient(to right, #08203e, #557c93)',
      Mist: 'linear-gradient(to right, #f7941e, #004e8f)',
      }
    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)'

  return (
    <>
      <div className='weather-container'>
        <div className='weather' style={{backgroundImage}}>
          <div>
            <p id='location-city'>{data.name}, {data.sys.country}</p>
          </div>
          <div className='weather-box'>
            <p className='temperature'>{Math.ceil(data.main.temp)}</p>
            
            <p className='description'>{data.weather[0].description}</p>
            {/* icon example */}
            <img src={iconUrl} alt='weather_icon' />
            </div>
           
          
          <div id='weather-bottom'>
            <div>
              <h2>
                Weather Details
              </h2>
            </div>
            <div>
              <p id='dt'><img src={weatherDetails.time} alt="time" />Current: {convertUnix(data.dt)}</p>
              <p id='humidity'><img src={weatherDetails.humidity} alt="humidity" />Humidity: {data.main.humidity}</p>
              <p id='wind-speed'><img src={weatherDetails.wind} alt="wind" />Wind Speed: {data.wind.speed}</p>
              <p id='pressure'><img src={weatherDetails.pressure} alt="pressure" />Pressure: {data.main.pressure}</p> 
            </div>
          </div>
          {/* bonus button */}
          <button onClick={resetData}>Reset</button>
        </div>
      </div>
    </>
  )
}
export default Weather;
