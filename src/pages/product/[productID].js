import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Papa from 'papaparse';
import { Star, Check, Minus, Plus } from 'lucide-react';

import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct';
import ProductGallery from '@/components/layout/ProductGallery';
import ProductCard from '@/components/ui/ProductCard';
import FashionLoadingAnimation from '@/components/layout/FashionLoadingAnimation';

function capitalizeEachWord(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function ProductDetail() {
  const router = useRouter();
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [product, setProduct] = useState(null);
  const [mapper, setMapper] = useState({});
  const [userId, setUserId] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const colors = ['#4F4631', '#314F4A', '#31344F'];
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  useEffect(() => {
    // Ensure minimum loading time for animation
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000); // 3 seconds for the full animation sequence

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setAnimationComplete(true);
  }, []);

  useEffect(() => {
    if (animationComplete && dataLoaded) {
      setIsLoading(false);
    }
  }, [animationComplete, dataLoaded]);

  useEffect(() => {
    if (!router.isReady) return;

    const productId = router.query.productID;
    if (!productId) return;

    const fetchMapperAndProduct = async () => {
      setError(null);
      try {
        const mapperResponse = await fetch('/link_mapper.csv');
        const mapperText = await mapperResponse.text();

        Papa.parse(mapperText, {
          header: true,
          complete: (results) => {
            const newMapper = Object.fromEntries(
              results.data.map(row => [row.path_id, row.origin_link])
            );
            setMapper(newMapper);
            fetchProduct(productId, newMapper);
          },
          error: (error) => {
            throw new Error('Failed to parse CSV file');
          }
        });
      } catch (error) {
        console.error('Error fetching mapper:', error);
        setError(error.message);
        setDataLoaded(true);
      }
    };

    const fetchProduct = async (productId, mapper) => {
      try {
        const token = localStorage.getItem('toklocalen');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`/api/product/getById/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (data.code === 1000) {
          let newPathId = mapper[data.result.pathId] || data.result.pathId;
          newPathId = `/api/${newPathId}/`;

          setProduct({
            ...data.result,
            pathId: newPathId
          });
        } else {
          throw new Error(data.message || 'Error fetching product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setDataLoaded(true);
      }
    };

    fetchMapperAndProduct();
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('toklocalen');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`/api/user/my-info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        setUserId(data.result.id);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (!userId || Object.keys(mapper).length === 0) return;

    const fetchRecommendationProducts = async () => {
      setIsRecommendationLoading(true);
      try {
        const token = localStorage.getItem('toklocalen');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`/api/user/recommend/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();

        // if (data.code === 1000 && Array.isArray(data.result)) {
        //   const processedRecommendations = data.result.map(item => {
        //     let newPathId = mapper[item.pathId] || item.pathId;
        //     newPathId = `/api/${newPathId}/`;
        //     const parts = newPathId.split('/');
        //     const lastPart = parts[parts.length - 2];
        //     const imagePaths = Array.from({ length: 3 }, (_, i) => `${newPathId}${lastPart}_${i}.jpeg`);

        //     return {
        //       ...item,
        //       imagePaths
        //     };
        //   });
        //   setRecommendations(processedRecommendations);
        // } else {
        //   throw new Error(data.message || 'Error fetching recommendations');
        // }
        // console.log("Recommendation lists:", processedRecommendations);
        if (data.code === 1000) {
           for(i = 0; i < 9; i++) {
            console.log("Item ${i}: ", data.result[i]);
           }
        }
        console.log("Data: ", data);
        console.log("User ID:", userId);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError(error.message);
      } finally {
        setIsRecommendationLoading(false);
      }
    };

    fetchRecommendationProducts();
  }, [userId, mapper]);

  const handleVirtualTryOn = () => {
    router.push('/virtual_try_on');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (isLoading) {
    return <FashionLoadingAnimation onLoadingComplete={handleLoadingComplete} />;
  }

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  const pathIds = product.pathId;
  const parts = pathIds.split('/');
  const lastPart = parts[parts.length - 2];
  const newPathIds = Array.from({ length: 3 }, (_, i) => `${pathIds}${lastPart}_${i}.jpeg`);

  return (
    <div>
      <NavbarAuth />
      <div className="bg-black pb-40">
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
          <div className='col-span-5'>
            <ProductGallery products={newPathIds}/>
          </div>

          <div className="col-span-4 text-white">
            <h1 className="font-kaushan text-[70px] ml-[-15px] mt-4">{capitalizeEachWord(product.name)}</h1>
            <p className="text-[34px] font-light font-montserrat tracing-[-1.35px] uppercase">{product.category}</p>
            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 mr-1">
                  <Image
                    src={i < Math.ceil(product.rating) ? "/Star.png" : "/Star-black.png"}
                    alt={i < Math.ceil(product.rating) ? "Rated star" : "Unrated star"}
                    width={32}
                    height={32}
                    layout="responsive"
                  />
                </div>
              ))}
              <span className="ml-2 text-lg">{product.rating}/5</span>
            </div>
            <p className="text-[71px] font-[Nakula] tracing-[-2.83px]">${product.price.toFixed(2)}</p>
            <p className="mb-6 font-montserrat w-[612px]">This elegant piece by Vu Van Long is perfect for any sophisticated occasion. Crafted from luxurious, breathable fabrics, it offers superior comfort and timeless style. The designer's attention to detail shines through in every aspect, from the exquisite tailoring to the subtle embellishments. This versatile garment seamlessly transitions from day to evening wear, embodying the essence of modern femininity and grace. Vu Van Long's commitment to quality ensures that this piece not only looks stunning but feels exceptional against the skin.</p>

            <div className="mb-6">
              <p className="mb-2 font-montserrat text-lg">Select Colors</p>
              <div className="flex space-x-4">
                {colors.map((color) => (
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
                <button 
                  className="relative w-[182.769px] h-[36px] bg-black overflow-hidden shadow-[0px_0px_28.523px_0px_rgba(255,255,255,0.25)] group transition-all duration-300 ease-in-out hover:brightness-75"
                  onClick={handleVirtualTryOn}
                >
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

            <div className="mb-6">
              <p className="text-lg mb-2">Choose Size</p>
              <div className="flex space-x-4">
                {sizes.map((size) => (
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
        <div className="mx-auto mt-[130px] px-[35px]">
          <div className="flex justify-between items-start mx-[-20px] text-white">
            {isRecommendationLoading ? (
              <div>Loading recommendations...</div>
            ) : recommendations && recommendations.length > 0 ? (
              recommendations.map((product, index) => (
                <div key={index} className="w-1/5 px-[20px]">
                  <ProductCard
                    imageUrl={product.imageUrl}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    rating={product.rating}
                  />
                </div>
              ))
            ) : (
              <div>No recommendations available</div>
            )}
          </div>
        </div>
      </div>
      <WhiteFooter />
    </div>
  );
}