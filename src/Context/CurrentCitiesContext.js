import React, { useState, createContext } from 'react';

export const CurrentCitiesContext = createContext();

export const CurrentCitiesProvider = props => {
    const [uCities, setUCities] = useState([]);

    return (
        <CurrentCitiesContext.Provider value={[uCities, setUCities]}>
            {props.children}
        </CurrentCitiesContext.Provider>
    );
}