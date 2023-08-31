// import { useState } from "react"
// import React from "react";
import { React, useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [previousWeather, setPreviousWeather] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = "b7b670bd4fa6712f27e052b420479cf1";
  const BASE_URL = "https://api.openweathermap.org/data/2.5";
  const url = `${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setPreviousWeather([ ...previousWeather, data]);
        setError("")
      })
      .catch( err => {
        if (err.response.status == 404) {
          setError("Invalid city Name")
        }else{
          setError("")
        }
        console.error(err) })
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <div className="text">
          <input
            value={location}
            onKeyPress={searchLocation}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            placeholder="Enter your city name"
            type="text"
          />
        </div>
      </div>
      <div className="error">
        <p>
          {error}
        </p>
      </div>
      {data.name != undefined && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
