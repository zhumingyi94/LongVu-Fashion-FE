// pages/signin.js
import React from 'react';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import NavbarAuth from '@/components/layout/Navbar';
import FilterSection from '@/components/ui/FilterSection';

const ProductPage = () => {
  return (
    <div>
    <NavbarAuth></NavbarAuth>
    <FilterSection></FilterSection>
    <WhiteFooter></WhiteFooter>
    </div>
  );
};

export default ProductPage;