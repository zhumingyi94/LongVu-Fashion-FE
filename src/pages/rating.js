import React, { useState, useEffect } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import Image from 'next/image';
import RatingCard from '@/components/ui/RatingCard';
import { useRouter } from 'next/router';
import Papa from 'papaparse';

const capitalizeWords = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export default function Rating() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapper, setMapper] = useState({});
  const [ratings, setRatings] = useState({});
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    const fetchMapperAndOrderDetails = async () => {
      try {
        // Fetch and parse the CSV file
        const mapperResponse = await fetch('/link_mapper.csv');
        const mapperText = await mapperResponse.text();

        Papa.parse(mapperText, {
          header: true,
          complete: (results) => {
            const newMapper = {};
            results.data.forEach(row => {
              newMapper[row.path_id] = row.origin_link;
            });
            setMapper(newMapper);
            fetchOrderDetails(newMapper);
          },
          error: (error) => {
            throw new Error('Failed to parse CSV file: ' + error.message);
          }
        });
      } catch (err) {
        setError('Error fetching mapper data: ' + err.message);
        console.error('Error fetching mapper data:', err);
        setIsLoading(false);
      }
    };

    fetchMapperAndOrderDetails();
  }, [router.isReady]);

  const fetchOrderDetails = async (mapper) => {
    const { orderData: orderDataString } = router.query;
    if (!orderDataString) {
      setError('No order data provided in URL');
      setIsLoading(false);
      return;
    }

    try {
      const parsedOrderData = JSON.parse(orderDataString);
      const token = localStorage.getItem('toklocalen');
      if (!token) {
        setError('User not logged in');
        setIsLoading(false);
        return;
      }

      const itemsWithDetails = await Promise.all(parsedOrderData.items.map(async (item) => {
        const productResponse = await fetch(`/api/product/getById/${item.product_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product details for ID: ${item.product_id}`);
        }

        const productData = await productResponse.json();
        if (productData.code !== 1000) {
          throw new Error(productData.message || `Error fetching product details for ID: ${item.product_id}`);
        }

        let pathId = productData.result.pathId;
        let newPathId = mapper[pathId] || pathId;
        const parts = newPathId.split('/');
        const lastPart = parts[parts.length - 1];
        const imageUrl = `/api/${newPathId}/${lastPart}_0.jpeg`;

        return {
          ...item,
          productDetails: {
            ...productData.result,
            name: capitalizeWords(productData.result.name),
            imageUrl: imageUrl
          }
        };
      }));

      setOrderData({ ...parsedOrderData, items: itemsWithDetails });
    } catch (err) {
      setError('Error fetching order details: ' + err.message);
      console.error('Error fetching order details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingChange = (id, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [id]: rating
    }));
  };

  const handleSubmitRatings = async () => {
    const token = localStorage.getItem('toklocalen');
    if (!token) {
      setError('User not logged in');
      return;
    }

    try {
      const ratingPromises = orderData.items.map(item => {
        const rating = ratings[item.id] || 0;
        return fetch(`/api/cartItem`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            rating: rating,
            size: item.size,
            color: item.color
          })
        });
      });

      const results = await Promise.all(ratingPromises);
      const failedRequests = results.filter(res => !res.ok);

      if (failedRequests.length > 0) {
        throw new Error(`Failed to submit ${failedRequests.length} ratings`);
      }

      setNotification('Ratings submitted successfully!');
      setTimeout(() => {
        setNotification('');
        router.push('/products');
      }, 2000);
    } catch (err) {
      setError('Error submitting ratings: ' + err.message);
      console.error('Error submitting ratings:', err);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Error: {error}</div>;
  }

  if (!orderData) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">No order data available</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAuth />
      <div className="flex-grow bg-black pb-10">
        <nav className="flex items-center pt-8 pl-8 mb-4 text-2xl font-montserrat text-white/60">
          <a href="/products" className="hover:text-white">Products</a>
          <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-2" />
          <span className="text-white">Rating</span>
        </nav>
        <h1 className="font-kaushan text-white text-center text-7xl mb-10">Rating Your Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
          {orderData.items.map((item, index) => (
            <RatingCard 
              key={index}
              id={item.id}
              product_id={item.product_id}
              imageUrl={item.productDetails.imageUrl}
              name={item.productDetails.name}
              size={item.size}
              color={item.color}
              onRatingChange={handleRatingChange}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button 
            className="border border-white font-montserrat text-white py-2 px-8 hover:bg-white hover:text-black transition duration-300"
            onClick={handleSubmitRatings}
          >
            Submit rating
          </button>
        </div>
      </div>
      <WhiteFooter />
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50 transition-opacity duration-300">
          {notification}
        </div>
      )}
    </div>
  );
}