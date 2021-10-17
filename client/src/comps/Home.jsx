import React from 'react';
import Proptypes from 'prop-types';

export const Home = ({number}) => {
  return (
    <div>THIS IS HOME: {number}</div>
  );
};

Home.propTypes = {
  number: Proptypes.string
}
