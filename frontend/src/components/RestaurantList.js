// src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRestaurants } from '../services/api';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching restaurants');
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>Restaurant List</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.restaurant_id}>
            <Link to={`/restaurants/${restaurant.restaurant_id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
