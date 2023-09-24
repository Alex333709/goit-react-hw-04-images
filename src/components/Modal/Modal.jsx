import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const Modal = ({ largeImageURL, tags, handleCloseModal }) => {
  useEffect(() => {
    const handlEsc = e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };
    document.addEventListener('keydown', handlEsc);
    disablePageScroll();
    return () => {
      document.removeEventListener('keydown', handlEsc);
      enablePageScroll();
    };
  }, [handleCloseModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  const modalWindow = document.querySelector('#root-modal');
  if (!modalWindow) {
    return null;
  }
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </Overlay>,
    modalWindow
  );
};

export default Modal;
