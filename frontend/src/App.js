import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Search from './components/Search';
import Register from './components/Register';
import Auth from './components/Auth';
import './App.css';

function App() {
    return (
    <Router>
        <div>
        <nav>
          <ul className="navbar">
          <div className="logo">
            <Link to="/">OmuNavi.至高のオムライスを求めて</Link>
          </div>
          <div className='right-menu'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/Search">Search</Link></li>
            </div>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
