// src/components/RestaurantDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantDetail } from '../services/api';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await getRestaurantDetail(id);
        setRestaurant(response.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching restaurant details');
      }
    };

    fetchRestaurantDetail();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>Location: {restaurant.location}</p>
      <p>Rating: {restaurant.rating}</p>
      <p>Price Range: {restaurant.price_range}</p>
    </div>
  );
};

export default RestaurantDetail;
