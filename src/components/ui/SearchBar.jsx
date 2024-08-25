import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
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



