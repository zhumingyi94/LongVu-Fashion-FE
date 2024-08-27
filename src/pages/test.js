import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct';
import ProductGallery from '@/components/layout/ProductGallery';
import FashionLoadingAnimation from '@/components/layout/FashionLoadingAnimation';

export default function ProductDetail() {
 return <FashionLoadingAnimation/>
}