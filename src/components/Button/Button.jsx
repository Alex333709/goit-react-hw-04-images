import { LoadMoreButton } from './Button.styled';

const Button = ({ handleBtnLoad }) => {
  return (
    <LoadMoreButton onClick={handleBtnLoad} type="button">
      Load more
    </LoadMoreButton>
  );
};

export default Button;
