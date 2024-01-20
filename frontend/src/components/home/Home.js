import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
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
import placeholderImage from './japan.jpg';
import axios from 'axios';


const Home = () => {
    const backgroundColor = '#2196F3';
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('https://localhost/8080');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
    }}, []);

    return (
        <Stack className="stack">
            <div className="title">
                <Button className="createButton" variant="contained">Create New Itinerary</Button>
            </div>
            <Grid container className="overallWrapper" spacing={1}>
                {/* {data.map(itinerary=> <Grid className="cardWrapper" item xs={4}>
                        <Card className="card">
                            <CardMedia>
                                <div style={{ backgroundColor, height: 148 }} />
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {itinerary.title}
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
                                <Button size="small">Delete</Button>
                            </CardActions>
                        </Card>
                </Grid>)} */}
                <Grid className="cardWrapper" item xs={4}>
                        <Card className="card">
                            <CardMedia
                                // {/* <div style={{ backgroundColor, height: 148 }} /> */}
                                component="img"
                                alt="green iguana"
                                height="148"
                                image={placeholderImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Japan Spring 2025
                                </Typography>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Budget:  
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        $2000
                                    </Typography>
                                </div>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Country:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Japan
                                    </Typography>
                                </div>
                                
                            </CardContent>
                            <CardActions>
                                <Button onClick={()=> {navigate("/itinerary")}} variant="contained" size="small">View</Button>
                                <Button variant="contained" size="small">Delete</Button>
                            </CardActions>
                        </Card>
                </Grid>
                <Grid className="cardWrapper" item xs={4}>
                        <Card className="card">
                            <CardMedia
                                // {/* <div style={{ backgroundColor, height: 148 }} /> */}
                                component="img"
                                alt="green iguana"
                                height="148"
                                image={placeholderImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Japan Spring 2025
                                </Typography>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Budget:  
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        $2000
                                    </Typography>
                                </div>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Country:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Japan
                                    </Typography>
                                </div>
                                
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small">View</Button>
                                <Button variant="contained" size="small">Delete</Button>
                            </CardActions>
                        </Card>
                </Grid>
                <Grid className="cardWrapper" item xs={4}>
                        <Card className="card">
                            <CardMedia
                                // {/* <div style={{ backgroundColor, height: 148 }} /> */}
                                component="img"
                                alt="green iguana"
                                height="148"
                                image={placeholderImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Japan Spring 2025
                                </Typography>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Budget:  
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        $2000
                                    </Typography>
                                </div>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Country:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Japan
                                    </Typography>
                                </div>
                                
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small">View</Button>
                                <Button variant="contained" size="small">Delete</Button>
                            </CardActions>
                        </Card>
                </Grid>
                <Grid className="cardWrapper" item xs={4}>
                        <Card className="card">
                            <CardMedia
                                // {/* <div style={{ backgroundColor, height: 148 }} /> */}
                                component="img"
                                alt="green iguana"
                                height="148"
                                image={placeholderImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    Japan Spring 2025
                                </Typography>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Budget:  
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        $2000
                                    </Typography>
                                </div>
                                <div className="holder">
                                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                        Country:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Japan
                                    </Typography>
                                </div>
                                
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" size="small">View</Button>
                                <Button variant="contained" size="small">Delete</Button>
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