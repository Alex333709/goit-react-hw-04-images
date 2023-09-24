import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getPhotosService } from '../Service/Service';
import Loader from './Loader/Loader';
import { AppContainer } from '../components/App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!searchQuery.trim()) {
        Notify.info('Please enter a search query.');
        return;
      }

      setIsLoading(true);

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

        setGallery(prevGallery => [...prevGallery, ...hits]);
        setQuantityPage(Math.ceil(totalHits / ITEMS_PER_PAGE));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchGallery();
    }
  }, [searchQuery, currentPage]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setGallery([]);
    setCurrentPage(1);
    setQuantityPage(null);
    setError(null);
  };

  const handleModal = obj => {
    setIsLoading(true);
    setShowModal(true);
    setLargeImageURL(obj.largeImageURL);
    setTags(obj.tags);
  };

  const handleCloseModal = () => {
    setIsLoading(false);
    setShowModal(false);
  };

  const handleBtnLoad = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {error && Notify.failure(error)}
      {gallery.length > 0 && (
        <ImageGallery hits={gallery} onClick={handleModal} />
      )}
      {currentPage < quantityPage && <Button handleBtnLoad={handleBtnLoad} />}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          handleCloseModal={handleCloseModal}
        />
      )}
    </AppContainer>
  );
};

export default App;
