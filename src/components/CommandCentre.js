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

            <Grid className={classes.root} container spacing={1}>
                <Grid item xs={10} >
                </Grid>
                <Grid item xs={2} >
                    <motion.div animate={{ x: [0, -15, 15, -15, 15, 0] }} whileHover={{ scale: 1.5, marginTop: "15px", marginBottom: "-15px", }}>
                        <Button className={classes.logoutButton} variant="contained" color="primary" onClick={logOout} >Log out</Button>
                    </motion.div>
                </Grid>
                <Grid item xs={12} >
                    <h1> Welcome to the Landing Page ! </h1>
                </Grid>
            </Grid>
            <Grid className={classes.root} container spacing={4}>
                {cityData.map((city, index) => {
                    return (
                        <Grid item xs={4} key={`${city.ID}-Grid`}  >
                            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1, delay: index / 15  }}>
                                <motion.div onClick={()=> props.valueChange(city.cityName)} whileHover={{ scale: 1.5 }} whileTap={{ scale: 1.4 }} >
                                    <InfoCard
                                        className={classes.gridElement}
                                        key={city.ID}
                                        name={city.cityName}
                                        temp={city.currentTemp}
                                        humidity={city.humidity}
                                        windSpeed={city.windSpeed}
                                        foreCast={city.foreCastTemp}
                                        pressure={city.pressure}
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
    gridElement: {
        boxShadow: "50px 10px, 8px, black",
        width: "80%",
        cursor: "pointer"
    },
    logoutButton: {
        margin: "15px",
        fontWeight: "bold",
    },
}));