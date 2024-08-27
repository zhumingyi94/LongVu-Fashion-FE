



import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct';
import ProductGallery from '@/components/layout/ProductGallery';

export default function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const productId = router.query.productID;
    console.log("Router query:", router.query);
    console.log("ProductId from router:", productId);

    if (!productId) {
      console.log("ProductId is undefined, waiting for router...");
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('toklocalen');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log("Fetching product with ID:", productId);
        const response = await fetch(`/api/product/getById/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (data.code === 1000) {
          setProduct(data.result);
          console.log("Product data:", data.result);
        } else {
          throw new Error(data.message || 'Error fetching product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [router.isReady, router.query]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (!router.isReady || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div>
      <NavbarAuth />
      <div className="bg-black pb-40">
        {/* Breadcrumb navigation */}
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
            <ProductGallery products={[product]}/>
          </div>

          {/* Right */}
          <div className="col-span-4 text-white">
            <h1 className="font-kaushan text-[85px] ml-[-20px]">{product.name}</h1>
            <p className="text-[34px] font-light font-montserrat tracing-[-1.35px]">{product.category}</p>
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
              <button className="group w-full bg-transparent h-[52px] !w-[350px] text-white font-montserrat font-light text-[16px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className='mt-[161px]'>
          <VideoHeaderProduct/>
        </div>
      </div>
      <WhiteFooter />
    </div>
  );
}