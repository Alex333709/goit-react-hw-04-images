import React, { useState } from 'react';
import { Notify } from 'notiflix';
import {
  SearchbarContainer,
  SearchFormContainer,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
const Searchbar = ({ onSubmit }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleInputQuery = e => {
    setInputQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputQuery.trim() === '') {
      Notify.info('Enter your request');
      return;
    }
    onSubmit(inputQuery.trim());
    setInputQuery('');
  };

  return (
    <SearchbarContainer>
      <SearchFormContainer onSubmit={handleSubmit}>
        <SearchFormButton type="submit"></SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputQuery}
          value={inputQuery}
        />
      </SearchFormContainer>
    </SearchbarContainer>
  );
};

export default Searchbar;
