import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPhotosService } from '../Service/Service';
import Loader from './Loader/Loader';
import { AppContainer } from '../components/App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const ITEMS_PER_PAGE = 12;

export default class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    currentPage: 1,
    quantityPage: null,
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
  };

  componentDidUpdate(_, prevState) {
    const { currentPage, searchQuery } = this.state;

    if (
      currentPage !== prevState.currentPage ||
      searchQuery !== prevState.searchQuery
    ) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    const { searchQuery, currentPage } = this.state;

    this.toggleLoading(true);

    try {
      const { hits, totalHits } = await getPhotosService(
        searchQuery,
        currentPage
      );

      if (hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.updateGallery(hits, totalHits);
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.toggleLoading(false);
    }
  };

  toggleLoading = isLoading => {
    this.setState({ isLoading });
  };

  updateGallery = (hits, totalHits) => {
    this.setState(prev => ({
      gallery: [...prev.gallery, ...hits],
      quantityPage: Math.ceil(totalHits / ITEMS_PER_PAGE),
    }));
  };

  handleFormSubmit = searchQuery => {
    this.resetGallery();
    this.setState({ searchQuery });
  };

  resetGallery = () => {
    this.setState({
      currentPage: 1,
      quantityPage: null,
      gallery: [],
      error: null,
    });
  };

  handleModal = obj => {
    this.toggleLoading(true);
    this.setState({ showModal: true, ...obj });
  };

  handleCloseModal = () => {
    this.toggleLoading(false);
    this.setState({ showModal: false });
  };

  handleBtnLoad = () => {
    this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
  };

  render() {
    const {
      error,
      gallery,
      isLoading,
      showModal,
      largeImageURL,
      tags,
      currentPage,
      quantityPage,
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {error && Notify.failure(error)}
        {gallery.length > 0 && (
          <ImageGallery hits={gallery} onClick={this.handleModal} />
        )}
        {currentPage < quantityPage && (
          <Button handleBtnLoad={this.handleBtnLoad} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </AppContainer>
    );
  }
}
