import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    setLoggedIn(false);
    return;
  } else {
    fetch("", {
      method: "POST",
      headers: {
        'jwt.token': user.token,
      }
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('Login Successful' === r.message)
        setUsername(user.username || "")
      });
  }
}, []);

export default App;
