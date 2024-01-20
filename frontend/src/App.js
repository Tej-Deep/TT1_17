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
import Itinerary from './components/itinerary/Itinerary'
import Form from './components/form/Form'

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
            path="/itinerary"
            element={<Itinerary />}
          />
           <Route
            exact
            path="/create"
            element={<Form />}
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
