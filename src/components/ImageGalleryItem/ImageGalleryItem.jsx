import { Component } from 'react';
import {
  ImageGalleryItemContainer,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  handleImgClick = () => {
    const { largeImageURL, tags, onClick } = this.props;
    onClick({ largeImageURL, tags });
  };

  render() {
    const { webformatURL, tags } = this.props;

    return (
      <ImageGalleryItemContainer onClick={this.handleImgClick}>
        <ImageGalleryItemImage src={webformatURL} alt={tags} />
      </ImageGalleryItemContainer>
    );
  }
}
