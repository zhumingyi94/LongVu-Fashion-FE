import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const token = localStorage.getItem('toklocalen');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      // Convert search query to lowercase
      const query = searchQuery.toLowerCase();

      try {
        // Fetch product by name
        const response = await fetch(`/api/product/getByName/${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.code === 1000 && data.result.length > 0) {
          const productId = data.result[0].id;
          router.push(`/product/${productId}`);
        } else {
          console.error('Product not found or error in response');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  };

  return (
    <div 
      className="bg-white flex items-center rounded-full shadow-lg"
      style={{
        maxWidth: '100%',
        height: '43px',
        padding: '9px 20px',
        gap: '4px',
        backgroundColor: 'white',
        borderRadius: '51.466px',
        boxShadow: '-7.841px 5.227px 4.117px 0px rgba(0, 0, 0, 0.25)',
        flexGrow: 4
      }}
    >
      <Search size={20} className="text-black min-w-[20px]" />
      <input
        type="text"
        placeholder="Find your favorite clothes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="outline-none focus:outline-none focus:ring-0 border-none text-l ml-3"
        style={{ 
          fontFamily: 'Montserrat, sans-serif',
          width: 'calc(100% - 40px)',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          background: 'transparent',
          backgroundColor: 'transparent'
        }}
      />
      <style jsx>{`
        input {
          background-color: transparent !important;
        }
        input:focus {
          outline: none !important;
          box-shadow: none !important;
          -webkit-box-shadow: none !important;
          -moz-box-shadow: none !important;
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
