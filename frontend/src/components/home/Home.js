import React from "react";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Home.css';



const Home = () => {
    const backgroundColor = '#2196F3';

    return (
        <Stack className="stack">
            <div className="title">
                <h1>Welcome!</h1>
            </div>
            <Grid container className="overallWrapper" spacing={1}>
                <Grid className="cardWrapper" item xs={4}>
                        <Card className="card">
                            <CardMedia>
                                <div style={{ backgroundColor, height: 148 }} />
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Japan Spring 2025
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Budget: $2000
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Country: Japan
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Edit</Button>
                                <Button size="small">Delete</Button>
                            </CardActions>
                        </Card>
                </Grid>
                <Grid item xs={4} className="cardWrapper">
                </Grid>
                <Grid item xs={4} className="cardWrapper">
                </Grid>
                <Grid item xs={4} className="cardWrapper">
                </Grid>
            </Grid>
        </Stack>

        // <div>
        //     <h1>Home Page</h1>

        //         <li>
        //             <Link to="/">Home</Link>
        //         </li>
        //         <li>
        //             <Link to="/login">Login</Link>
        //         </li>
        //         <li>
        //             <Link to="/itenary">Itenary</Link>
        //         </li>
                
        // </div>
    )
};
 
export default Home;