import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct'
import { useRouter } from 'next/router'
import ProductGallery from '@/components/layout/ProductGallery'
import { Star } from 'lucide-react';

const products = [
    {
      imageUrl: '/DressTestpng.png',
      name: 'One Piece Medium',
      brand: 'LONG VU',
      price: 3.725,
      rating: 4.5,
      description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
      colors: ['black', 'green', 'blue'],
      sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    },
    // ... other products
];

export default function ProductDetail() {
  const router = useRouter()
  const { productId } = router.query
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = products[0]; // For demonstration, using the first product

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div>
      <NavbarAuth />
      <div className="bg-black">
        <div className="grid grid-cols-9">
          {/* Left */}
          <div className='col-span-5'>
            <ProductGallery products={products}/>
          </div>
      
          {/* Right */}
          <div className="col-span-4 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl mb-4">{product.brand}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={20} fill={index < Math.floor(product.rating) ? "yellow" : "none"} stroke="yellow" />
              ))}
              <span className="ml-2">{product.rating}/5</span>
            </div>
            <p className="text-3xl font-bold mb-4">${product.price.toFixed(3)}</p>
            <p className="mb-6">{product.description}</p>
            <div className="mb-6">
              <p className="mb-2">Select Colors</p>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 border ${selectedColor === color ? 'border-2 border-white' : 'border-gray-400'}`}
                    style={{backgroundColor: color}}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="mb-2">Choose Size</p>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border ${selectedSize === size ? 'bg-white text-black' : 'border-white text-white'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center mb-6">
              <button onClick={decrementQuantity} className="px-4 py-2 border border-white">-</button>
              <span className="mx-4">{quantity}</span>
              <button onClick={incrementQuantity} className="px-4 py-2 border border-white">+</button>
            </div>
            <button className="group w-full bg-white text-bold text-black font-montserrat py-3 px-4 font-bold text-[24px] border border-white transition-all duration-300 ease-in-out hover:bg-transparent !mt-[40px] mb-4">
              <span className="group-hover:text-white transition-colors duration-300 ease-in-out">Add to Cart</span>
            </button>
            <button className="w-full border border-white py-3 text-cyan-400">VIRTUAL TRY ON</button>
          </div>
        </div>
        <VideoHeaderProduct />
      </div>
      <WhiteFooter />
    </div>
  )
}