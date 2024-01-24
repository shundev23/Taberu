import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Taberu from './components/Taberu';
import './App.css';

function App() {
  return (
    <Router>
        <div>
            <nav>
                <ul className='navbar'>
                    <li>
                        <Link to="/">ホーム</Link>
                    </li>
                    <li>
                        <Link to="/about">Taberuについて</Link>
                    </li>
                    <li>
                        <Link to="/Taberu">Taberuを始める</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route exact path="/"  element={<HomePage />} />
                <Route path="/about"  element={<AboutPage />} />
                <Route path="/Taberu"  element={<Taberu />} />
                {/* 他のルート... */}
                </Routes>
        </div>
    </Router>
  );
}

export default App;
