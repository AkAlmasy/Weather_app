import React, { useContext } from 'react';

import WeatherView from './components/WeatherView';
import LoginPage from './components/LoginPage';

import { AuthContext } from './Context/AuthContext';
import { CurrentCitiesProvider } from './Context/CurrentCitiesContext';


import './styles/login.css';
import './App.css';




function App() {

  const [auth] = useContext(AuthContext);


  return (
    <div>
      <CurrentCitiesProvider>
        {!auth.authenticated ?
          <LoginPage />
          : <WeatherView />}
      </CurrentCitiesProvider>
    </div>

  );
}



export default App;