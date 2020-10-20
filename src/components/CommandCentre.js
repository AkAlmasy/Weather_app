import React, { useContext } from 'react';
import InfoCard from './InfoCard';

import { Grid, makeStyles, Button } from '@material-ui/core';
import { motion } from "framer-motion"

import { WeatherDataContext } from '../Context/WeatherDataContext';
import { CurrentCitiesContext } from '../Context/CurrentCitiesContext';
import { AuthContext } from '../Context/AuthContext';


export default function CommandCentre(props) {
    const [cityData, setCityData] = useContext(WeatherDataContext);
    const [auth, setAuth] = useContext(AuthContext);
    const [uCities, setUCities] = useContext(CurrentCitiesContext);

    const classes = useStyles();

    function logOout() {
        setAuth(false);
        setCityData([]);
        setUCities([]);
    }

    return (
        <React.Fragment>
            <Grid className={classes.root} container spacing={0}>

                <Grid item xs={10} ></Grid>
                <Grid item xs={2} >
                    <motion.div animate={{ x: [0, -15, 15, -15, 15, 0], opacity: [0, 1] }} whileHover={{ scale: 1.5, marginTop: "15px", marginBottom: "-15px", }}>
                        <Button className={classes.logoutButton} variant="contained" color="primary" onClick={logOout} >Log out</Button>
                    </motion.div>
                </Grid>

                <Grid item xs={4} ></Grid>
                <Grid item xs={4} >
                    <motion.h1 animate={{ opacity: [0, 1] }} transition={{ duration: 1 }} whileTap={{ scale: 1.1, }} > {`Welcome ${auth.uName}`} </motion.h1>
                </Grid>
                <Grid item xs={4} ></Grid>

                <Grid item xs={5} ></Grid>
                <Grid item xs={2} >
                    <motion.div animate={{ opacity: [0, 1], scale: [0, 1.2, 1] }} whileHover={{ scale: 1.5, marginTop: "15px", marginBottom: "-15px", }}>
                        <Button onClick={() => props.setNewCityDialog(true)} className={classes.addNewCityButton} variant="contained" color="primary" size="large">Add New City !</Button>
                    </motion.div>
                </Grid>
                <Grid item xs={5} ></Grid>

            </Grid>
            <Grid className={classes.root} container spacing={4}>
                {cityData.map((city, index) => {
                    return (
                        <Grid item xs={4} key={`${city.ID}-Grid`}  >
                            <motion.div animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} initial={{ opacity: 0, scale: 0, x: -250, y: -250 }} transition={{ duration: 1, delay: index / 15 }}>
                                <motion.div whileHover={{ scale: 1.2, cursor: "pointer" }} whileTap={{ scale: 1.1 }} >
                                    <InfoCard
                                        className={classes.gridElement}
                                        key={city.ID}
                                        name={city.cityName}
                                        temp={city.currentTemp}
                                        humidity={city.humidity}
                                        windSpeed={city.windSpeed}
                                        foreCast={city.foreCastTemp}
                                        pressure={city.pressure}
                                        removeCity={props.removeCity}
                                        valueChange={props.valueChange}
                                    />
                                </motion.div>
                            </motion.div>
                        </Grid>
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
        textAlign: 'center',
        width: "80%",
    },
    logoutButton: {
        margin: "15px",
        fontWeight: "bold",
    },
    addNewCityButton: {
        margin: "45px",
        fontWeight: "bold",
    },
}));