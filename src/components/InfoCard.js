import React from 'react';

import { Card, CardContent, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function InfoCard(props) {
    const { name, temp, humidity, windSpeed, pressure, removeCity, valueChange } = props;

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
                <Grid container spacing={0}>
                    <Grid item xs={9} onClick={() => valueChange(name)}>
                    </Grid>
                    <Grid item xs={3} >
                        <Button onClick={() => removeCity(name)}  color="primary"  variant="contained" size="small" >
                            <DeleteForeverIcon/>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1} onClick={() => valueChange(name)} >
                    <Grid item xs={12}>
                        <Typography className={classes.title} color="primary" variant="h4">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2">
                            Current temp: {temp} C
                </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" >
                            Humidity: {humidity} %
                </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                            Windspeed: {windSpeed} m/s
                </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                            Pressure: {pressure} mbar
                </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
