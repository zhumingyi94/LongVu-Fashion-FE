import React from 'react';
import ProductCard from '../ui/ProductCard';

const TrendingProducts = ({ products }) => {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            brand={product.brand}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;