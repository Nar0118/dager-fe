import React from 'react';
import CarDetails from '../components/CarDetails'

const CarPage = ({ match }) => {
  return (
    <div>
      <CarDetails match={match} />
    </div>
  );
};

export default CarPage;
