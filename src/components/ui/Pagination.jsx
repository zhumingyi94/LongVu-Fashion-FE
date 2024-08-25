import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center my-[87px] space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-3 bg-white text-black font-montserrat text-[30px] font-bold"
      >
        ← Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 font-montserrat text-[30px] ${
            currentPage === index + 1 
              ? 'text-white font-bold' 
              : 'text-gray-400 font-medium'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-3 bg-white text-black font-montserrat text-[30px] font-bold"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;