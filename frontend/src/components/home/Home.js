import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>

                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/itinerary">Itinerary</Link>
                </li>
                
        </div>
    );
};
 
export default Home;