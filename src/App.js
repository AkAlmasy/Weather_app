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
    //get userName from local store
    console.log(uName);
    console.log(pwd);
    //get passwd from local store
    if (localStorage.getItem(uName) == null && uName != null) {
      localStorage.setItem(uName, pwd);
      setAuthenticad(true);
    } else if (localStorage.getItem(uName).split(",")[0] == pwd) {
      let userCities = localStorage.getItem(uName).split(",").slice(1);
      setCities([...cities, ...userCities]);
      console.log(cities);
      setAuthenticad(true);
    }



  }

  return (
    <div className="App">
      {!authenticad ? <Paper className={classes.loginPaper} elevation={20}>
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
    marginTop: theme.spacing(5),
    margin: "auto",
    width: 450,
    padding: theme.spacing(2),
  }
}));

export default App;