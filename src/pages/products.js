import React from 'react';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import FilterSection from '@/components/ui/FilterSection';
import ProductGrid from '@/components/layout/ProductGrid';

const ProductPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavbarAuth />
      <main className="flex-grow flex">
        <aside className="w-[341px] flex-shrink-0">
          <FilterSection />
        </aside>
        <section className="flex-grow">
          <ProductGrid />
        </section>
      </main>
      <WhiteFooter />
    </div>
  );
};

export default ProductPage;