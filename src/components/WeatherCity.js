import { Box, Grid, LinearProgress, Typography, Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function TabPanel(props) {
    const { children, value, index, cityName, ...other } = props;
    const [cityWeather, setCityWeather] = useState({ list: [] });
    const [weatherRequested, setWeatherRequested] = useState(false);
    const [hasWeather, setHasWeather] = useState(false);
    const [comError, setComError] = useState(false);
    const [humidity, setHumidity] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [todayTemp, setTodayTemp] = useState(0);
    const API_KEY = "e6b99c711faae3f6fc79f80d4c370664";
    const classes = useStyles();

    useEffect(() => {
        if (!hasWeather && !weatherRequested && !comError) {
            //request data
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
            fetch(url).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data);
                        setHasWeather(true);
                        setCityWeather(data);
                    });
                } else {
                    setComError(true);
                    console.log("HERE");
                }
                //console.log(res)
            }).catch(err => { setComError(true); console.error(err); console.log("There"); });
        }
    }, []);


    function createData() {
        let data = [];
        let label = [];
        try {
            if (hasWeather && !weatherRequested) {
                cityWeather.list.map(
                    (dataItem, index) => {
                        if (index % 2 === 0) {
                            data.push(dataItem.main.temp);
                            label.push(dataItem.dt_txt.split(" "));
                            if (index === 0) {
                                setTodayTemp(dataItem.main.temp);
                                setHumidity(dataItem.main.humidity);
                                setPressure(dataItem.main.pressure);
                                setWindSpeed(dataItem.wind.speed);
                            }
                        }
                    }
                );
                return {
                    labels: [...label],
                    datasets: [
                        {
                            label: `${cityName}'s weather forcast`,
                            fill: true,
                            lineTension: 0.2,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
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
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {comError ? <div>Communicatin error. Refresh page!</div> : null}
                    {(weatherRequested && !comError) ? <LinearProgress />
                        : null}
                    {hasWeather ? <div>
                        <Grid container spacing={1}>
                            <Grid item xs={6} >
                                <h2>{cityName}</h2>
                            </Grid>
                            <Grid item xs={6} className={classes.rightJustifyStyle} >
                                <Button className={classes.buttonStyle} onClick={() => props.removeCity(cityName)}>Remove Forecast !</Button>
                            </Grid>
                            <Grid item xs={3} >
                                Todays temperature: <b> {todayTemp} C </b>
                            </Grid>
                            <Grid item xs={3} >
                                Humidity: <b> {humidity} % </b>
                            </Grid>
                            <Grid item xs={3}>
                                Pressure: <b> {pressure} mbar </b>
                            </Grid>
                            <Grid item xs={3}>
                                Windspeed: <b> {windSpeed} m/s </b>
                            </Grid>

                        </Grid>
                        <Line className={classes.lineStyle} data={createData} />
                    </div> : null}

                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "WhiteSmoke",
        width: "97%",
        margin: "auto",
        border: "2px solid black",
        padding: "35px"
    },
    buttonStyle: {
        background: 'linear-gradient(45deg, #6bfcfe 30%, #6b7ffe 90%)',
        boxShadow: '0 3px 10px 3px rgb(179, 179, 179)',
    },
    rightJustifyStyle: {
       textAlign: 'right',
    },    
}));
