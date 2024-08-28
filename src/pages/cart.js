import React, { useState, useEffect } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import CartCard from '@/components/ui/CartCard';
import Papa from 'papaparse';

const capitalizeWords = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [mapper, setMapper] = useState({});

  useEffect(() => {
    const fetchMapperAndCartData = async () => {
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
            fetchCartData(newMapper);
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

    fetchMapperAndCartData();
  }, []);

  const fetchCartData = async (mapper) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('toklocalen');

    if (!userId || !token) {
      setError('User not logged in');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('toklocalen');
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      if (data.code === 1000) {
        setCartData(data.result);
        fetchProductDetails(data.result.cartItems, mapper);
      } else {
        throw new Error(data.message || 'Error fetching cart data');
      }
    } catch (err) {
      console.error('Error fetching cart data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductDetails = async (cartItems, mapper) => {
    const token = localStorage.getItem('toklocalen');
    const details = {};

    for (const item of cartItems) {
      try {
        const response = await fetch(`/api/product/getById/${item.product_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product details for ID: ${item.product_id}`);
        }

        const data = await response.json();
        if (data.code === 1000) {
          let pathId = data.result.pathId;
          let newPathId = mapper[pathId] || pathId;
          const parts = newPathId.split('/');
          const lastPart = parts[parts.length - 1];
          const imageUrl = `/api/${newPathId}/${lastPart}_0.jpeg`;

          details[item.product_id] = {
            ...data.result,
            name: capitalizeWords(data.result.name),
            imageUrl: imageUrl
          };
          console.log("Details: ", details);
        } else {
          throw new Error(data.message || `Error fetching product details for ID: ${item.product_id}`);
        }
      } catch (error) {
        console.error(error);
        details[item.product_id] = { name: "Product Name Unavailable", imageUrl: "/api/placeholder/154/239" };
      }
    }
    setProductDetails(details);
  };


  const calculateSubtotal = () => {
    return cartData ? cartData.cartItems.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.2;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + 15; // 15 is the delivery fee
  };

  const handleRemoveItem = async (item) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('toklocalen');

    if (!userId || !token) {
      setDeleteError('User not logged in');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/${userId}/cart/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          rating: item.rating,
          size: item.size,
          color: item.color
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete item from cart');
      }

      // Update local state instead of refetching all cart data
      setCartData(prevCartData => ({
        ...prevCartData,
        cartItems: prevCartData.cartItems.filter(cartItem => cartItem.id !== item.id)
      }));

      // Remove the product details for the deleted item
      setProductDetails(prevDetails => {
        const newDetails = { ...prevDetails };
        delete newDetails[item.product_id];
        return newDetails;
      });

      setDeleteError(null);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      setDeleteError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    setCartData(prevData => ({
      ...prevData,
      cartItems: prevData.cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  if (error) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">{error}</div>;
  }

  if (isLoading && !cartData) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">Loading...</div>;
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
          <span className="text-white">Cart</span>
        </nav>
        {deleteError && (
          <div className="bg-red-500 text-white p-2 mb-4 text-center">
            {deleteError}
          </div>
        )}
        <div className="flex justify-between px-[30px] py-[20px]">
          <div className="w-[860px] space-y-4">
            {cartData && cartData.cartItems.map((item) => (
              <CartCard
                key={item.id}
                imageUrl={productDetails[item.product_id]?.imageUrl || "/api/placeholder/154/239"}
                name={capitalizeWords(productDetails[item.product_id]?.name) || "Loading..."}
                price={item.price}
                size={item.size}
                color={item.color}
                quantity={item.quantity}
                onDelete={() => handleRemoveItem({
                  id: item.id,
                  product_id: item.product_id,
                  quantity: item.quantity,
                  price: item.price,
                  rating: item.rating,
                  size: item.size,
                  color: item.color
                })}
                onUpdateQuantity={(newQuantity) => updateItemQuantity(item.id, newQuantity)}
              />
            ))}
          </div>
          <div className="w-[400px] bg-black text-white mr-[150px] mt-4 rounded-[10px]">
            <h2 className="text-[40px] font-kaushan mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 font-montserrat">
              <div className="flex justify-between text-[20px]">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[20px] font-bold font-montserrat">
                <span className="bg-gradient-to-r from-[#05FFF0] to-[#064CFF] bg-clip-text text-transparent">
                  Discount (-20%)
                </span>
                <span className="bg-gradient-to-r from-[#05FFF0] to-[#064CFF] bg-clip-text text-transparent">
                  -${calculateDiscount().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[20px] font-montserrat">
                <span>Delivery Fee</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between text-[24px] font-bold mt-4 font-montserrat">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full font-montserrat bg-white text-black py-4 text-[18px] font-semibold flex items-center justify-center mb-6 transition-all duration-300 ease-in-out hover:bg-transparent hover:text-white hover:border hover:border-white">
              Go to Checkout
              <ArrowRight className="ml-2" />
            </button>
            <div>
              <label className="block text-[18px] mb-2 font-montserrat">Enter your address</label>
              <input 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address here"
                className="w-full bg-black border-b border-white pb-2 text-white placeholder-gray-500 focus:outline-none font-montserrat"
              />
            </div>
          </div>
        </div>
      </div>
      <WhiteFooter />
    </div>
  )
}