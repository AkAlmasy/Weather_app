import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



export default function InfoCard(props) {
    const { name, temp, humidity, windSpeed, pressure } = props;

    const useStyles = makeStyles({
        root: {
            minWidth: 190,
            margin: "auto",
            boxShadow: "5px 5px 5px #888888"
        },
    });

    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="primary" variant="h4">
                    {name}
                </Typography>
                <Typography variant="h6" component="h2">
                    Current temp: {temp} C
                </Typography>
                <Typography variant="body2" component="p" >
                   Humidity: {humidity} %
                </Typography>
                <Typography variant="body2" component="p">
                    Windspeed: {windSpeed} m/s
                </Typography>
                <Typography variant="body2" component="p">
                   Pressure: {pressure} mbar
                </Typography>
            </CardContent>
        </Card>
    );
}
