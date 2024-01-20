import React, { useState } from "react";
import './Login.css'

import { useNavigate} from "react-router-dom";
import { Button } from 'rsuite';

const Login = () => {
    
    const [action,setAction] = useState("Sign Up")

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }
    
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">

            </div>
            {action==="Log In" && (
                <div className="forgot-password">
                Lost Password?
                <span> Click Here</span>
            </div>
            )}
            <div className="submit-container">
                <div className={action==="Log In"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Log In")}}>Log In</div>
            </div>
            <Button appearance="primary" onClick={handleClick}>Hello World</Button>
        </div>
    );
};

export default Login;