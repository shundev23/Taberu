// src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
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
        <h1>Restaurant List</h1>
        <ul>
            {restaurants.map((restaurant) => (
                <li key={restaurant.restaurant_id}>{restaurant.name}</li>
                ))}
        </ul>
    </div>
    );
};

export default RestaurantList;
