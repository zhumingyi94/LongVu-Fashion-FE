import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import FilterSection from '@/components/ui/FilterSection';
import ProductGrid from '@/components/layout/ProductGrid';
import FashionLoadingAnimation from '@/components/layout/FashionLoadingAnimation';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [mapper, setMapper] = useState({});
  const router = useRouter();

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
    const fetchMapperAndProducts = async () => {
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
            fetchProducts(newMapper);
          },
          error: (error) => {
            throw new Error('Failed to parse CSV file');
          }
        });
      } catch (err) {
        setError(err.message);
        setDataLoaded(true);
      }
    };

    const fetchProducts = async (mapper) => {
      try {
        const token = localStorage.getItem('toklocalen');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/product/getAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('toklocalen');
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        if (data.code === 1000 && Array.isArray(data.result)) {
          // Apply mapping and transformation to products
          const mappedProducts = data.result.map(product => {
            let newPathId = mapper[product.pathId] || product.pathId;
            const parts = newPathId.split('/');
            const lastPart = parts[parts.length - 1];
            newPathId = `/api/${newPathId}/${lastPart}_0.jpeg`;
            return {
              ...product,
              pathId: newPathId
            };
          });
          setProducts(mappedProducts);
          console.log(mappedProducts);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        setError(err.message);
        if (err.message === 'No authentication token found') {
          router.push('/error');
        }
      } finally {
        setDataLoaded(true);
      }
    };

    fetchMapperAndProducts();
  }, [router]);

  if (isLoading) {
    return <FashionLoadingAnimation onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      <NavbarAuth />
      <main className="flex-grow flex">
        <aside className="w-[341px] flex-shrink-0">
          <FilterSection />
        </aside>
        <section className="flex-grow">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </main>
      <WhiteFooter />
      <Link href="/ai-retrieval" className="group">
        <div className="fixed right-[50px] bottom-[100px] z-50 w-[100px] h-[100px] rounded-full bg-black overflow-hidden shadow-[0px_0px_27.1px_rgba(255,255,255,0.50)] transition-opacity duration-300 ease-in-out group-hover:opacity-70">
          <Image
            src="/AIRetrieval.png"
            alt="AI Retrieval"
            width={70}
            height={70}
            className="absolute pt-[95px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </Link>
    </div>
  );
};

export default ProductPage;