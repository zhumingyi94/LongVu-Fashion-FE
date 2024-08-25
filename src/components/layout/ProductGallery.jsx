import React, { useState, useEffect } from 'react';
import ProductCardDetail from '../ui/ProductCardDetail';
import ProductCardSmall from '../ui/ProductCardSmall';

const ProductGallery = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // Initialize with the first product

  useEffect(() => {
    setSelectedProduct(products[0]); // Ensure the first product is selected on mount or when products change
  }, [products]);

  return (
    <div className="flex bg-black p-8">
      {/* Small Product Gallery */}
      <div className="w-[166px] flex flex-col space-y-4 overflow-y-auto">
        {products.map((product, index) => (
          <ProductCardSmall
            key={index}
            imageUrl={product.imageUrl}
            selected={product === selectedProduct} // Highlight if selected
            onClick={() => setSelectedProduct(product)} // Set as selected on click
          />
        ))}
      </div>

      {/* Main Product Detail */}
      <div className="flex-1 ml-[100px]">
        <ProductCardDetail
          imageUrl={selectedProduct.imageUrl}
          name={selectedProduct.name}
          brand={selectedProduct.brand}
          price={selectedProduct.price}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
