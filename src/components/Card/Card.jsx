import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "https://api.weatherapi.com/v1/forecast.json?";
const API_KEY = "09303b02e0494feb982123006242307";

function Card({ latitude, longitude, wcity }) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [city, setCity] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [temp, setTemp] = useState('');
  const [highTemp, setHighTemp] = useState('');
  const [lowTemp, setLowTemp] = useState('');
  const [condition, setCondition] = useState('');
  const [realFeel, setRealFeel] = useState('');
  const [wind, setWind] = useState('');
  const [weatherImg, setWeatherImg] = useState('');
  const [humidity,setHumidity] = useState('');

  useEffect(() => {
    let API_FULL_URL = '';
    if (latitude !== '' && longitude !== '') {
      API_FULL_URL = `${API_URL}key=${API_KEY}&q=${latitude},${longitude}&alerts=yes`;
    } else if (wcity !== '') {
      API_FULL_URL = `${API_URL}key=${API_KEY}&q=${wcity}&alerts=yes`;
    }
    else {
      console.log("Data not found")
    }

    axios.get(API_FULL_URL)
      .then(res => {
        console.log(res.data);
        setCity(res.data.location.name);
        const newDate = new Date();
        setDate(newDate.toLocaleDateString());
        setDay(days[newDate.getDay()]);
        setTemp(res.data.current.temp_c);
        setHighTemp(res.data.forecast.forecastday[0].day.maxtemp_c);
        setLowTemp(res.data.forecast.forecastday[0].day.mintemp_c);
        setCondition(res.data.current.condition.text);
        setRealFeel(res.data.current.feelslike_c);
        setWind(res.data.current.wind_kph);
        setWeatherImg(res.data.current.condition.icon);
        setHumidity(res.data.current.humidity);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [latitude, longitude, wcity]);

  return (
    <div className='flex justify-center flex-col items-center bg-gradient-to-r from-[#a5f3fc] via-[#22d3ee] to-[#0891b2] w-56 h-60 rounded-lg shadow-lg shadow-cyan-500/50'>
      <div className='flex justify-center items-start'>
        <img className='w-28 p-3' src={weatherImg} alt="Weather Image" />
        <div className='w-28 pt-2 flex justify-start items-start flex-col'>
          <p className='font-semibold text-gray-600'>{city}</p>
          <p className='font-semibold'>{day}</p>
          <p className='font-semibold'>{date}</p>
          <div className='flex justify-center items-center font-sans'>
            <p className='text-[28px]'>{temp}&deg;</p>
            <div className='h-7 w-[3px] bg-gray-500 ml-1'></div>
            <div className='flex justify-center items-center flex-col text-[10px] pl-2 text-gray-800'>
              <p>{highTemp}&deg;</p>
              <p>{lowTemp}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center flex-col items-start pl-2'>
        <p>{condition}</p>
        <p>Real feel: {realFeel}&deg;</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {wind} km/h</p>
      </div>
    </div>
  );
}

export default Card;