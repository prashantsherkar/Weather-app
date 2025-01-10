import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

    const input_val = useRef();
    const [weatherData, setweatherData] = useState(false);
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": clear,
        "02n": clear,
        "03d": clear,
        "03n": clear,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    }
    
    const search = async (city)=> {
        if(city === ''){
            alert("Enter the city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_KEY}`;
            const resp = await fetch(url);
            const data = await resp.json();
            if(!resp.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setweatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })
            
        } catch (error) {
            setweatherData(false);
            console.log("Data not fetch");
            
        }
    }
    useEffect(()=>{
        search("Pune");
    },[])

  return (
    <div className='weather-wrapper'>
      <div className='search-bar'>
        <input ref={input_val} type="text" placeholder='Search City' />
        <img src={search_icon} alt="" onClick={()=>search(input_val.current.value)} />
      </div>

      {weatherData? <>
      <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='weather-temp'>{weatherData.temperature} °C</p>
      <p className='weather-loaction'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind} alt="" />
            <div>
                <p>{weatherData.windspeed} Km/H</p>
                <span>wind Speed</span>
            </div>
        </div>
      </div>
      </> : <></>}
      
    </div>
  )
}

export default Weather
