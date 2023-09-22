import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default class Modal extends Component {
  state = {
    modalWindow: null,
  };

  componentDidMount() {
    const modalWindow = document.querySelector('#root-modal');
    document.addEventListener('keydown', this.handleEsc);
    if (modalWindow) {
      this.setState({ modalWindow });
      disablePageScroll();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
    enablePageScroll();
  }

  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.handleCloseModal();
    }
  };

  render() {
    const { modalWindow } = this.state;
    const { largeImageURL, tags } = this.props;

    if (!modalWindow) {
      return null;
    }

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>,
      modalWindow
    );
  }
}
