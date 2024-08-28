import React from 'react';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import { useRouter } from 'next/router';

const TrendingProducts = ({ products }) => {
  const router = useRouter();
  const handleDiscoverAll = () => {
    router.push('/sign_in')
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl="/DressTestpng.png"
            name={product.name}
            brand={product.brand}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
      <div className="flex justify-center mt-[120px] mb-[192px] transform scale-[1.5]">
        <Button button_text="DISCOVER ALL" onClick={handleDiscoverAll}/>
      </div>
    </div>
  );
};

export default TrendingProducts;