import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import FilterSection from '@/components/ui/FilterSection';
import ProductGrid from '@/components/layout/ProductGrid';

const ProductPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black relative">
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