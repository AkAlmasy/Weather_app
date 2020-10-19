import React, { useEffect, useState, useContext } from 'react';

import { Box, Grid, LinearProgress, Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { motion } from "framer-motion";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { CurrentCitiesContext } from '../Context/CurrentCitiesContext';
import { WeatherDataContext } from '../Context/WeatherDataContext';

import '../styles/WeatherCity.css';

export default function TabPanel(props) {
    const { children, value, index, cityName, removeCity } = props;

    const [cityWeather, setCityWeather] = useState({});
    const [hasWeather, setHasWeather] = useState(false);
    const [comError, setComError] = useState(false);


    const classes = useStyles();

    const [uCities] = useContext(CurrentCitiesContext);
    const [cityData] = useContext(WeatherDataContext);


    useEffect(() => {
        if (uCities.includes(cityName)) setHasWeather(true);
        cityData.forEach(function (city) {
            if (city.cityName === cityName) {
                setCityWeather(city);
            }
        });
    }, []);

    /*     function searchCurrentCity() {
        } */

    function createData() {
        //searchCurrentCity();
        let data = [];
        let label = [];
        try {
            if (hasWeather) {
                label = cityWeather.dtText;
                data = cityWeather.foreCastTemp;

                return {
                    labels: [...label],
                    datasets: [
                        {
                            label: `${cityName}'s weather forcast`,
                            fill: true,
                            lineTension: 0.2,
                            backgroundColor: 'rgba(63,81,181,0.4)',
                            borderColor: 'rgba(63,81,181,0.7)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(63,81,181,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 5,
                            pointHoverRadius: 10,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(120,120,120,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [...data]
                        }
                    ]
                };

            } else {
                return {};
            }

        } catch (error) {
            console.error(error);
            setComError(true);
            return {};
        }

    }

    return (
        <div className={classes.root}
            role="tabpanel"
            hidden={value !== cityName}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}

        >
            {value === cityName && (
                <Box p={3}>
                    {hasWeather ? <div>
                        <Grid container spacing={1}>
                            <Grid item xs={1} ></Grid>
                            <Grid item xs={10}  >
                                <motion.h1 className="title" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.75 }}>
                                    {cityName}
                                </motion.h1>
                            </Grid>
                            <Grid item xs={1} >
                                <motion.div className="removeButton" animate={{ opacity: 1, scale: [1, 2, 1], }} initial={{ opacity: 0 }} >
                                    <Button onClick={() => removeCity(cityName)}> <DeleteForeverIcon fontSize="large" /> </Button>
                                </motion.div>
                            </Grid>

                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} >
                                <motion.div animate={{ x: 0, opacity: 1 }} initial={{ x: '-100vw', opacity: 0 }} transition={{ delay: 0.2, duration: 0.75 }} >
                                    <TableContainer component={Paper} className={classes.table}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>City</TableCell>
                                                    <TableCell align="right">Current Temperature</TableCell>
                                                    <TableCell align="right">Humidity</TableCell>
                                                    <TableCell align="right">Pressure</TableCell>
                                                    <TableCell align="right">Windspeed</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow key={cityName}>
                                                    <TableCell component="th" scope="row"><b>{cityName}</b></TableCell>
                                                    <TableCell align="right"><b> {cityWeather.currentTemp} C </b></TableCell>
                                                    <TableCell align="right"><b> {cityWeather.humidity} % </b></TableCell>
                                                    <TableCell align="right"><b> {cityWeather.pressure} mbar </b></TableCell>
                                                    <TableCell align="right"><b> {cityWeather.windSpeed} m/s </b></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} className={classes.line}>
                                <motion.div animate={{ x: 0, opacity: 1 }} initial={{ x: '100vw', opacity: 0 }} transition={{ delay: 0.2, duration: 0.75 }} >
                                    <Line data={createData} />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </div> :
                        <h1>City not found ! </h1>
                    }

                </Box>
            )
            }
        </div >
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#E0E0E0",
        margin: "auto",
        padding: "35px"
    },
    rightJustifyStyle: {
        textAlign: 'right',
        marginBottom: "50px",
    },
    table: {
        minWidth: 500,
        maxWidth: 1000,
        fontWeight: "bold",
        margin: "auto",
    },
    line: {
        minWidth: 500,
        maxWidth: 1500,
        margin: "auto",
    },
}));