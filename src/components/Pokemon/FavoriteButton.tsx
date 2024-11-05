import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle Favorite"
      className="favorite-button"
    >
      {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
    </button>
  );
};

export default FavoriteButton;
