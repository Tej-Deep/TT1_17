import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
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

export default App;
