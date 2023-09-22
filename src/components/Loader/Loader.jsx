import React from 'react';
import { Oval } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';
const Loader = () => {
  return (
    <LoaderContainer>
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={2000}
        strokeWidthSecondary={2030}
        color="blue"
        secondaryColor="Grey"
      />
    </LoaderContainer>
  );
};

export default Loader;
