import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
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
                </ul>
            </nav>
            <Routes>
                <Route exact path="/"  element={<HomePage />} />
                <Route path="/about"  element={<AboutPage />} />
                {/* 他のルート... */}
                </Routes>
        </div>
    </Router>
  );
}

export default App;
