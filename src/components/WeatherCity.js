import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
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

    //const [weatherData, setWeatherData] = useState([]);

   // const addWeatherData = event => {
    //    event.preventDefault();
    //    setWeatherData([
    //        ...weatherData,
    //        {
    //            humidit: weatherHumidity,
   //             pressure: weatherPressure,
    //            windSpeed: weatherWindSpeed
   //         }
   //     ]);
   //     setHumidity(0);
    //    setPressure(0);
   //     setWindSpeed(0);
   // } 

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
                        if (index % 8 === 0) {
                            data.push(dataItem.main.temp);
                            label.push(dataItem.dt_txt);
                            if (index === 0){
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
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
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
        <div
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
                        <Grid item xs={12} >
                                <h3>{cityName}</h3>
                            </Grid>
                        <Grid item xs={6} >
                                Todays temperature: {todayTemp}
                            </Grid>
                            <Grid item xs={6} >
                                Humidity: {humidity}
                            </Grid>
                            <Grid item xs={6}>
                               Pressure: {pressure}
                            </Grid>
                            <Grid item xs={6}>
                               Windspeed: {windSpeed}
                            </Grid>

                        </Grid>
                        <Line data={createData} />
                    </div> : null}

                </Box>
            )}
        </div>
    );
}