import React from 'react';
import './HomePage.css'; // HomePage-specific styles

function HomePage() {
  async function handleClick(){
    try{
      const response = await fetch('http://localhost:8000/Taberu/test/');
      console.log(response);
    }catch(error){
      console.error("Error during fetch: ", error);
    }
  }
  return (
    <div className="home">
      <h1 onClick={handleClick}>Welcome to the Taberu App</h1>
      <p>This is the Taberu. Click the links above to navigate.</p>
    </div>
  );
}

export default HomePage;