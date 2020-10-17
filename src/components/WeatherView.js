import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Tabs, Tab, makeStyles, withStyles } from '@material-ui/core';

import NewCityDialog from './NewCityDialog';
import TabPanel from './WeatherCity';
import CommandCentre from './CommandCentre';

import { WeatherDataContext } from '../Context/WeatherDataContext';
import { CurrentCitiesContext } from '../Context/CurrentCitiesContext';
import { AuthContext } from '../Context/AuthContext';



export default function WeatherView(props) {
    const [value, setValue] = useState("home");
    const [openNewCityDialog, setOpenNewCityDialog] = useState(false);
    const [comError, setComError] = useState(false);
    const API_KEY = "e6b99c711faae3f6fc79f80d4c370664";

    const classes = useStyles();

    const [cityData, setCityData] = useContext(WeatherDataContext);
    const [uCities, setUCities] = useContext(CurrentCitiesContext);
    const [auth] = useContext(AuthContext);


    const handleChange = (event, newValue) => {
        if (newValue === "+") setOpenNewCityDialog(true); 
        setValue(newValue);
    };

    function valueChange (newValue) {
        setValue(newValue);
    };


    function appendToLocalStorage(cityName) {
        let old = localStorage.getItem(auth.uName + "Data");
        if (old === "") localStorage.setItem(auth.uName + "Data", cityName);
        else {
            localStorage.setItem(auth.uName + "Data", old + "," + cityName);
        }
    }


    function handleAddCity(city) {
        setComError(false);
        if (!comError) {
            let ForeCastTempData = [];
            let dtText = [];
            //request data
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
            fetch(url).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        data.list.map((dataItem, index) => {
                            if (index % 4 === 0) {
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
                        setOpenNewCityDialog(false);
                        setUCities(prevCities => [...prevCities, city]);
                        appendToLocalStorage(city);
                    });
                } else {
                    setComError(true);
                    console.log("HERE");
                }
                //console.log(res)
            }).catch(err => { setComError(true); console.error(err); console.log("There"); });
        }
    };


    function handleRemoveCity(cityName) {
        let afterRemove = localStorage.getItem(auth.uName + "Data").split(",");
        afterRemove.splice(afterRemove.indexOf(cityName), 1);
        // console.log(afterRemove);
        setUCities(afterRemove);
        localStorage.setItem(auth.uName + "Data", afterRemove);
        for (var i = cityData.length - 1; i >= 0; --i) {
            if (cityData[i].cityName === cityName) {
                cityData.splice(i,1);
            }
        }

        setValue("home");
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs className={classes.tabStyle} value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable"
                        scrollButtons="auto">
                    <StyledTab key="CommandCentreTab" label="Command Centre" value="home" />
                    {uCities.map((city, index) =>
                        <StyledTab key={`${city}-${index}`} label={city} value={city} />
                    )}
                    <Tab key="add_new_city_tab" label="+" value="+" />
                </Tabs>
            </AppBar>
            {value === "home" ?
                <CommandCentre valueChange={valueChange}/> :
                uCities.map((city, index) =>
                    <TabPanel key={`tabpanel-${city}-${index}`} value={value} index={index} cityName={city} removeCity={handleRemoveCity} />
                )}
            <NewCityDialog open={openNewCityDialog} cancelAction={()=> setOpenNewCityDialog(false)} okAction={handleAddCity} />
        </div>
    );
}



let StyledTab = withStyles((theme) => ({
    root: {
        fontSize: "18px",
        fontFamily: "Arial, Helvetica, sans-serif",
        textTransform: "initial",
    },
    selected: {
        fontWeight: "bold",
    },

}))((props => <Tab {...props} />));

const useStyles = makeStyles((theme) => ({
    root: {

    },
    tabStyle: {
        backgroundColor: "#3f51b5",
        color: "white",
        fontWeight: "bold",
    },
}));