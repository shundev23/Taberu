import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Taberu from './components/Taberu';
import Login from './components/Login';
import './App.css';

function App() {
    return (
    <Router>
        <div>
            <nav>
                <ul className='navbar'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/Taberu">Taberu</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route exact path="/"  element={<Home />} />
                <Route path="/about"  element={<About />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/Taberu"  element={<Taberu />} />
                {/* 他のルート... */}
                </Routes>
        </div>
    </Router>
  );
}

export default App;
