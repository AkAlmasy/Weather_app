import React, { useContext } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import WeatherView from './components/WeatherView';
import LoginPage from './components/LoginPage';

import { AuthContext } from './Context/AuthContext';
import { WeatherDataProvider } from './Context/WeatherDataContext';
import { CurrentCitiesProvider } from './Context/CurrentCitiesContext';


import './styles/login.css';
import './App.css';




function App() {
  const [auth] = useContext(AuthContext);

  const theme = createMuiTheme({
    palette: {
      type: "light",
    }
  });


  return (
    <ThemeProvider theme={theme}>
      <div>
        <CurrentCitiesProvider>
          <WeatherDataProvider>
            {!auth.authenticated ?
              <LoginPage />
              : <WeatherView />}
          </WeatherDataProvider>
        </CurrentCitiesProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;