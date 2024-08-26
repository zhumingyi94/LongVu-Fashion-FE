import React, { useState } from 'react';
import Image from 'next/image';
import ProductCard from '../ui/ProductCard';
import Pagination from '../ui/Pagination';

const ProductGrid = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    return (
      <div className="bg-black min-h-screen p-8">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-center text-[38.616px] leading-normal">
              <span className="text-white font-['Kaushan_Script'] font-normal">Clothing for </span>
              <span 
                className="font-montserrat font-bold tracking-[18.536px] leading-[140.715%] ml-[15px]"
                style={{
                  background: 'linear-gradient(90deg, #05FFF0 59.94%, #064CFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                WOMEN
              </span>
            </h1>
            <a 
              href="#" 
              className="inline-flex items-center gap-[6.364px] font-montserrat text-[25.455px] font-normal"
              style={{
                color: 'rgba(255, 255, 255, 0.60)',
                leadingTrim: 'both',
                textEdge: 'cap',
              }}
            >
              Home
              <Image
                src="/arrow.png"
                alt="Arrow"
                width={25}
                height={25}
                className="inline-block ml-1"
              />
            </a>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                name={product.name}
                brand={product.category}
                price={product.price}
                rating={product.rating}
                imageUrl={`${product.pathId}`}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  };
    
  export default ProductGrid;