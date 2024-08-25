import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct'
import { useRouter } from 'next/router'
import ProductGallery from '@/components/layout/ProductGallery'
import { Star, Check, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';

const products = [
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 3.725,
    rating: 4.5,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
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
];

export default function ProductDetail() {
  const router = useRouter()
  const { productId } = router.query
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = products[0]; // For demonstration, using the first product
  const galleryProducts = products.slice(0, 3); // Only take the first 3 products for the gallery

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div>
      <NavbarAuth />
      <div className="bg-black pb-40">
        {/* Add breadcrumb navigation */}
        <nav className="flex items-center pt-[43px] pl-[30px] mb-[10px] text-[25.455px] font-montserrat" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
          <a href="/" className="inline-flex items-center">
            Home
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-[8px]" />
          </a>
          <a href="/your" className="inline-flex items-center">
            Product
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-[8px]" />
          </a>
          <span className="text-white">Details</span>
        </nav>

        <div className="grid grid-cols-9">
          {/* Left */}
          <div className='col-span-5'>
            <ProductGallery products={galleryProducts}/>
          </div>
      
          {/* Right */}
          <div className="col-span-4 text-white">
            <h1 className="font-kaushan text-[85px] ml-[-20px]">{product.name}</h1>
            <p className="text-[34px] font-light font-montserrat tracing-[-1.35px]">{product.brand}</p>
            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 mr-1">
                  <Image
                    src={i < Math.floor(product.rating) ? "/Star.png" : "/Star-black.png"}
                    alt={i < Math.floor(product.rating) ? "Rated star" : "Unrated star"}
                    width={32}
                    height={32}
                    layout="responsive"
                  />
                </div>
              ))}
              <span className="ml-2 text-lg">{product.rating}/5</span>
            </div>
            <p className="text-[71px] font-[Nakula] tracing-[-2.83px]">${product.price.toFixed(3)}</p>
            <p className="mb-6 font-montserrat w-[612px]">{product.description}</p>
            
            {/* Color selection */}
            <div className="mb-6">
              <p className="mb-2 font-montserrat text-lg">Select Colors</p>
              <div className="flex space-x-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedColor === color ? 'ring-2 ring-white' : ''
                    }`}
                    style={{backgroundColor: color}}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && <Check className="text-white" size={16} />}
                  </button>
                ))}
                <button className="relative w-[182.769px] h-[36px] bg-black overflow-hidden shadow-[0px_0px_28.523px_0px_rgba(255,255,255,0.25)] group transition-all duration-300 ease-in-out hover:brightness-75">
                  <div className="absolute inset-0 flex items-center justify-center pb-[3px]">
                    <Image
                      src="/VTOn.png"
                      width={163}
                      height={29}
                      alt="VIRTUAL TRY ON"
                      className="object-contain transition-all duration-300 ease-in-out group-hover:opacity-75"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF] to-[#0059FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out" />
                </button>
              </div>
            </div>
            
            {/* Size selection */}
            <div className="mb-6">
              <p className="text-lg mb-2">Choose Size</p>
              <div className="flex space-x-4">
                {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 text-[16px] font-montserrat transition-all duration-300 ease-in-out
                      ${selectedSize === size 
                        ? 'bg-white text-black border-2 border-white' 
                        : 'bg-black text-white border border-white hover:bg-white hover:text-black'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mb-6 flex flex-row items-center gap-[20px]">
              <div className="flex items-center justify-between w-32 bg-white text-black h-[52px]">
                <button 
                  onClick={decrementQuantity} 
                  className="px-3 py-2 hover:bg-gray-200 rounded-l-md"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-2 font-semibold">{quantity}</span>
                <button 
                  onClick={incrementQuantity} 
                  className="px-3 py-2 hover:bg-gray-200 rounded-r-md"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="group w-full bg-transparent h-[52px] w-[400px] text-white font-montserrat font-light text-[16px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className='mt-[161px]'>
          <VideoHeaderProduct/>
        </div>
        <div className="mx-auto mt-[130px] px-[35px] ">
  <div className="flex justify-between items-start mx-[-20px]">
    {products.map((product, index) => (
      <div key={index} className="w-1/5 px-[20px]">
        <ProductCard
          imageUrl={product.imageUrl}
          name={product.name}
          brand={product.brand}
          price={product.price}
          rating={product.rating}
        />
      </div>
    ))}
  </div>
</div>
  
      </div>
      <WhiteFooter />
    </div>
  )
}