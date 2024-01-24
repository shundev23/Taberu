import React from 'react';
import './HomePage.css'; // HomePage-specific styles

function HomePage() {
  async function handleClick(){
    try{
      const response = await fetch('http://127.0.0.1:8000/Taberu/');
      console.log(response);
    }catch(error){
      console.error("Error during fetch: ", error);
    }
  }
  return (
    <div className="home">
      <h1>Welcome to the Taberu App</h1>
      <h2>Login</h2>
      <p>This is the Taberu. Click the links above to navigate.</p>
    </div>
  );
}

export default HomePage;