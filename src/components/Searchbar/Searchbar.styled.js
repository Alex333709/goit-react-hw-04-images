import styled from 'styled-components';

export const SearchbarContainer = styled('div')(() => ({
  top: '0',
  left: '0',
  position: 'sticky',
  zIndex: '1100',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '64px',
  paddingRight: '24px',
  paddingLeft: '24px',
  paddingTop: '12px',
  paddingBottom: '12px',
  color: '#fff',
  backgroundColor: '#3f51b5',
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
}));

export const SearchFormContainer = styled('form')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#fff',
  borderRadius: '3px',
  overflow: 'hidden',
}));

export const SearchFormButton = styled('button')(() => ({
  display: 'inline-block',
  width: '48px',
  height: '48px',
  border: '0',
  backgroundImage: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' id='Outline' viewBox='0 0 24 24' width='512' height='512'%3E%3Cpath d='M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z'/%3E%3C/svg%3E")`,
  backgroundSize: '40%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  opacity: '0.6',
  transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  outline: 'none',
}));

export const SearchFormInput = styled('input')(() => ({
  display: 'inline-block',
  width: '100%',
  font: 'inherit',
  fontSize: '20px',
  border: 'none',
  outline: 'none',
  paddingLeft: '4px',
  paddingRight: '4px',
}));
