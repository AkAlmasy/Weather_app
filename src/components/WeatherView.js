import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Box, Typography, Tab, makeStyles } from '@material-ui/core';
import NewCityDialog from './NewCityDialog';
import TabPanel from './WeatherCity';


export default function WeatherView(props) {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [cities, setCities] = useState([]);
    const [openNewCityDialog, setOpenNewCityDialog] = useState(false);

    useEffect(() => {
        console.log(props.cities);
        setCities([...cities, ...props.cities])
    }, []);


    const handleChange = (event, newValue) => {
        if (newValue === "+") {
            // alert("Add new city to this list");
            setOpenNewCityDialog(true);
        }
        setValue(newValue);
    };

    function appendToLocalStorage(cityName) {
        let old = localStorage.getItem(props.userName);
        if (old === null) old = "";
        localStorage.setItem(props.userName, old + "," + cityName);
    }

    /* function removeFromLocalStorage(cityName) {
        let old = localStorage.getItem(props.userName).split(",");
        if (old === null) old = "";
        const index = old.indexOf(cityName);
        if (index >= -1) {
            old.splice(index,1);
        }
        localStorage.setItem(props.userName, old);
    } */

    function handleDialogClose() {
        setOpenNewCityDialog(false);
    }

    function handleAddCity(cityName) {
        console.log(cityName);
        setCities([...cities, cityName]);
        setOpenNewCityDialog(false);
        appendToLocalStorage(cityName);
    }

/*     function handleRemoveCity(cityName){

        setCities(cities.splice(cities.indexOf(cityName),1));
        removeFromLocalStorage(cityName);

    } */




    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {cities.map((city, index) =>
                        <Tab key={`${city}-${index}`} label={city} value={index} />
                    )}
                    <Tab key="add_new_city_tab" label="+" value="+" />

                </Tabs>
            </AppBar>

            {cities.map((city, index) => {
                return <TabPanel key={`tabpanel-${city}-${index}`} value={value} index={index} cityName={city}  />
            })}
            

            <NewCityDialog open={openNewCityDialog} cancelAction={handleDialogClose} okAction={handleAddCity} />
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
    },
}));