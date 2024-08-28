import React from 'react';
import Image from 'next/image';

const NotificationModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="mb-4">
            <Image src="/check-circle.svg" width={64} height={64} alt="Success" />
          </div>
          <h2 className="text-2xl font-kaushan mb-4 text-gray-800">{message}</h2>
          <button
            onClick={onClose}
            className="bg-black text-white font-montserrat py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;