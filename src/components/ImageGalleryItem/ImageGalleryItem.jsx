import React from 'react';
import {
  ImageGalleryItemContainer,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  const handleImgClick = () => {
    onClick({ largeImageURL, tags });
  };
  return (
    <ImageGalleryItemContainer onClick={handleImgClick}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
    </ImageGalleryItemContainer>
  );
};
export default ImageGalleryItem;
