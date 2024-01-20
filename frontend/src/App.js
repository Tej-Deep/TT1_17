import './App.css';

import 'rsuite/dist/rsuite.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './components/home/Home';
import Login from './components/login/Login';
import Itenary from './components/itenary/Itenary'

function App() {
  return (
    <div >
      
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/itenary"
            element={<Itenary />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
