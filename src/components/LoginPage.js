import React, { useState, useContext } from 'react';
import { Paper, TextField, Button, makeStyles } from '@material-ui/core';
import { motion } from "framer-motion"

import { WeatherDataContext } from '../Context/WeatherDataContext';
import { AuthContext } from '../Context/AuthContext';
import { CurrentCitiesContext } from '../Context/CurrentCitiesContext';

export default function LoginPage(props) {
    const classes = useStyles();

    const [uName, setUName] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [cities, setCities] = useState([]);

    const [weatherRequested] = useState(false);
    const [hasWeather, setHasWeather] = useState(false);
    const [comError, setComError] = useState(false);
    const API_KEY = "e6b99c711faae3f6fc79f80d4c370664";

    const [auth, setAuth] = useContext(AuthContext);
    const [uCities, setUCities] = useContext(CurrentCitiesContext);
    const [cityData, setCityData] = useContext(WeatherDataContext);


    const handleLogin = (e) => {
        e.preventDefault();
        if (localStorage.getItem(uName) === null && uName !== null && uName !== "" && pwd !== "" && pwd !== null) {
            localStorage.setItem(uName, pwd);
            localStorage.setItem(uName + "Data", "");
            setAuth({ authenticated: true, uName: uName });
        } else if (localStorage.getItem(uName) === pwd && uName !== null && uName !== "" && pwd !== "" && pwd !== null) {
            if (localStorage.getItem(uName + "Data") !== "") {
            let userCities = localStorage.getItem(uName + "Data").split(",");
                setCities([...cities, ...userCities]);
                setUCities([...uCities, ...userCities]);
                userCities.forEach(function (city) {
                    addCityDataToContext(city);
                });
            }
            setAuth({ authenticated: true, uName: uName });
        }
    }


    function addCityDataToContext(city) {
        if (!hasWeather && !weatherRequested && !comError) {
            let ForeCastTempData = [];
            let dtText = [];
            //request data
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
            fetch(url).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data);
                        data.list.map((dataItem, index) => {
                            if (index % 1 === 0) {
                                ForeCastTempData.push(dataItem.main.temp);
                                    dtText.push(dataItem.dt_txt);
                            }
                        });
                        setCityData(prevCityData => [...prevCityData, {
                            cityName: data.city.name,
                            currentTemp: data.list[0].main.temp,
                            foreCastTemp: ForeCastTempData,
                            dtText: dtText,
                            humidity: data.list[0].main.humidity,
                            pressure: data.list[0].main.pressure,
                            windSpeed: data.list[0].wind.speed,
                            ID: data.city.id,
                        }]);
                    });
                } else {
                    setComError(true);
                    console.log("HERE");
                }
                //console.log(res)
            }).catch(err => { setComError(true); console.error(err); console.log("There"); });
        }
        setHasWeather(true);
    };




    return (
        <motion.div className="loginDiv"
            animate={{ y: 0 }} initial={{ y: -800 }} transition={{ type: 'spring', stiffness: 70, ease: "circOut", duration: 0.7 }}
            drag
            dragElastic
            dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50, }} >
            <motion.div whileHover={{ scale: 1.05, }}>
                <Paper className={classes.loginPaper} elevation={20} >
                    <motion.h1 className="home-title">
                        <span>Welcome to my Weather app !</span>
                    </motion.h1>
                    <p>Enter your User Name and Password, if you dont have one yet, a new account will be created with the given information.</p>
                    <form >
                        <div>
                            <TextField label="User Name" onChange={event => setUName(event.target.value)} />
                        </div>
                        <div>
                            <TextField label="Passwd" type="password" onChange={event => setPwd(event.target.value)} />
                        </div>
                        <motion.div
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: [1, 3, 1],
                                rotate: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
                                duration: 5
                            }}
                            initial={{ y: 500, opacity: 0 }} transition={{ duration: 0.7 }}                    >
                            <motion.div className="loginButton" whileHover={{ scale: 1.5, marginTop: "15px", marginBottom: "-15px", }}>
                                <Button type="submit" variant="contained" color="primary" className={classes.loginButton} onClick={handleLogin} >Login</Button>
                            </motion.div>
                        </motion.div>
                    </form>
                </Paper>
            </motion.div>
        </motion.div >
    )

}

const useStyles = makeStyles(theme => ({
    loginPaper: {
        textAlign: "center",
        marginTop: theme.spacing(20),
        margin: "auto",
        width: "100%",
        padding: theme.spacing(10),
    },
    loginButton: {
        marginTop: "15px",
        fontWeight: "bold",
    },
}));