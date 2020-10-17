import React, { useState, createContext } from 'react';

export const WeatherDataContext = createContext();

export const WeatherDataProvider = props => {
    const [cityData, setCityData] = useState([]);

    /* {
        cityName: 
        currentTemp: 
        foreCastTemp: 
        dtText:
        humidity: 
        pressure: 
        windSpeed: 
        ID:
    } */

    return (
        <WeatherDataContext.Provider value={[cityData, setCityData]}>
            {props.children}
        </WeatherDataContext.Provider>
    );
}

