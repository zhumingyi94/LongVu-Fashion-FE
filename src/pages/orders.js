import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import Image from 'next/image';
import OrderCard from '@/components/ui/OrderCard';
import Papa from 'papaparse';
import FashionLoadingAnimation from '@/components/layout/FashionLoadingAnimation';
import Button from '@/components/ui/Button';

const capitalizeWords = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export default function OrderHistory() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapper, setMapper] = useState({});
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setAnimationComplete(true);
  }, []);

  const handleClick = (order) => {
    router.push({
      pathname: '/rating',
      query: { orderData: JSON.stringify(order) },
    });
  }

  useEffect(() => {
    const fetchMapperAndOrderHistory = async () => {
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
            fetchOrderHistory(newMapper);
          },
          error: (error) => {
            throw new Error('Failed to parse CSV file');
          }
        });
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMapperAndOrderHistory();
  }, []);

  const fetchOrderHistory = async (mapper) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('toklocalen');

    if (!userId || !token) {
      setError('User not logged in');
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user info
      const userInfoResponse = await fetch(`/api/user/my-info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!userInfoResponse.ok) {
        if (userInfoResponse.status === 401) {
          localStorage.removeItem('toklocalen');
          router.push('/sign_in');
          return;
        }
        throw new Error('Failed to fetch user info');
      }

      const userInfoData = await userInfoResponse.json();
      console.log("User info: ", userInfoData);
      if (userInfoData.code !== 1000) {
        throw new Error(userInfoData.message || 'Error fetching user info');
      }

      const userOrders = userInfoData.result.orders;
      console.log("userOrders: ", userOrders);

      const ordersWithDetails = await Promise.all(userOrders.map(async (order) => {
        // Fetch cart details
        const cartResponse = await fetch(`/api/cart/${order.cart_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("cartId: ", order.cart_id);

        if (!cartResponse.ok) {
          throw new Error(`Failed to fetch cart details for order ID: ${order.id}`);
        }

        const cartData = await cartResponse.json();
        if (cartData.code !== 1000) {
          throw new Error(cartData.message || `Error fetching cart details for order ID: ${order.id}`);
        }

        const cartItems = cartData.result.cartItems;

        // Fetch product details for each cart item
        const itemsWithProductDetails = await Promise.all(cartItems.map(async (item) => {
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

        return {
          ...order,
          items: itemsWithProductDetails
        };
      }));

      setOrders(ordersWithDetails);
    } catch (err) {
      console.error('Error fetching order history:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">{error}</div>;
  }

  if (isLoading) {
    return <FashionLoadingAnimation onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div>
      <NavbarAuth />
      <div className="bg-black min-h-screen">
        <nav className="flex items-center pt-[43px] pl-[30px] mb-[10px] text-[25.455px] font-montserrat" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
          <a href="/your" className="inline-flex items-center">
            Product 
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-[8px]" />
          </a>
          <span className="text-white">Order History</span>
        </nav>
        <h1 className='text-white font-kaushan text-center text-[60px] mb-[40px]'>Order History</h1>

        <div className="px-[30px] py-[20px]">
          <div className="space-y-[60px]">
            {orders.map((order, index) => (
              <div key={order.id} className="p-6 rounded-lg">
                <h2 className='text-white font-montserrat font-bold text-[32px] mb-6'>Order #{index + 1}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg">
                      <OrderCard
                        imageUrl={item.productDetails.imageUrl}
                        name={item.productDetails.name}
                        price={item.price}
                        size={item.size}
                        color={item.color}
                        quantity={item.quantity}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-white text-[22px] font-montserrat mt-14 space-y-2 text-center">
                  <p><span className="font-bold">Total Cost:</span> ${order.total_cost.toFixed(2)}</p>
                  <p><span className="font-bold">Status:</span> {order.status}</p>
                  <p><span className="font-bold">Address:</span> {order.address}</p>
                  <p><span className="font-bold">Order Date:</span> {new Date(order.create_at).toLocaleDateString()}</p>
                  <div className='pt-[50px]'>
                    <Button 
                      button_text="RATING ORDER" 
                      onClick={() => handleClick(order)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WhiteFooter />
    </div>
  );
}