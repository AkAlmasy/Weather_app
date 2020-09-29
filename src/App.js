import React, { useState } from 'react';
import './App.css';
import { Paper, Input, TextField, Button, makeStyles } from '@material-ui/core';
import WeatherView from './components/WeatherView';

function App() {
  const [authenticad, setAuthenticad] = useState(false);
  const [uName, setUName] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [cities, setCities] = useState([]);
  const classes = useStyles();


  function handleLogin() {
    if (localStorage.getItem(uName) === null && uName != null) {
      localStorage.setItem(uName, pwd);
      localStorage.setItem(uName + "Data", "");
      setAuthenticad(true);
    } else if (localStorage.getItem(uName) === pwd) {
      let userCities = localStorage.getItem(uName + "Data").split(",");
      if (userCities != "") setCities([...cities, ...userCities]);
      console.log(cities);
      setAuthenticad(true);
    }
  }

  return (
    <div className="App">
      {!authenticad ?
        <Paper className={classes.loginPaper} elevation={20} >
          <h3>Welcome to my Weather app !</h3>
          <p>Enter your User Name and Password, if you dont have one yet, a new account will be created with the given information.</p>
          <form >
            <div>
              <TextField label="User Name" onChange={event => setUName(event.target.value)} />
            </div>
            <div>
              <TextField label="Passwd" type="password" onChange={event => setPwd(event.target.value)} />
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary" onClick={handleLogin} >Login</Button>
            </div>

          </form>
        </Paper>
        : <WeatherView cities={cities} userName={uName} />}





    </div>
  );
}

const useStyles = makeStyles(theme => ({
  loginPaper: {
    textAlign: "center",
    marginTop: theme.spacing(10),
    margin: "auto",
    width: 550,
    padding: theme.spacing(7),
  }
}));

export default App;