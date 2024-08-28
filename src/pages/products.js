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
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [mapper, setMapper] = useState({});
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 5000],
  });
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);

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
          setAllProducts(mappedProducts);
          setFilteredProducts(mappedProducts);
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

  useEffect(() => {
    const applyFilters = () => {
      let result = allProducts;

      // Apply category filter
      if (filters.categories.length > 0) {
        result = result.filter(product => 
          filters.categories.includes(product.categories)
        );
      }
      // Apply price range filter
      result = result.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );

      setFilteredProducts(result);
    };

    applyFilters();
  }, [filters, allProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  if (isLoading) {
    return <FashionLoadingAnimation onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      <NavbarAuth />
      <main className="flex-grow flex">
        <aside className="w-[341px] flex-shrink-0">
          <FilterSection 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </aside>
        <section className="flex-grow">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <ProductGrid products={filteredProducts} />
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