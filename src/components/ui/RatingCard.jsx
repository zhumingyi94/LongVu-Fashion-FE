import React, { useState } from 'react';
import Image from 'next/image';

const RatingCard = ({ id, product_id, imageUrl, name, size, color, initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(id, selectedRating);
  };

  return (
    <div className="bg-black text-white p-4 rounded-lg">
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <Image 
          src={imageUrl || "/api/placeholder/300/200"} 
          alt={name} 
          layout="fill" 
          objectFit="cover"
        />
      </div>
      <h2 className="text-2xl font-kaushan mb-2">{name}</h2>
      <p className="text-sm font-montserrat mb-1">
        Size: <span className="text-gray-400">{size}</span>
      </p>
      <p className="text-sm font-montserrat mb-4">
        Color: <span className="text-gray-400">{color}</span>
      </p>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            className="focus:outline-none mr-1"
          >
            <Image
              src={star <= rating ? "/Star.png" : "/Star-black.png"}
              alt={star <= rating ? "Rated star" : "Unrated star"}
              width={24}
              height={24}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingCard;