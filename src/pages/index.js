import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import NavbarUnauth from "@/components/layout/Navbar_unauth";
import BuyNowButton from "@/components/ui/BuyNowButton"
import VideoHeader from "@/components/ui/VideoHeader";
import MenBodySection from "@/components/layout/MenBodySection";
import VideoHeaderLarge from "@/components/ui/VideoHeaderLarge";
import WomenBodySection from "@/components/layout/WomenBodySection";
import VideoHeaderReverse from "@/components/ui/VideoHeaderReverse";
import WhiteFooter from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import TrendingProducts from "@/components/layout/TrendingProducts";

const inter = Inter({ subsets: ["latin"] });
const trendingProducts = [
  {
    imageUrl: "/images/product1.jpg",
    name: "One Piece Medium",
    brand: "MIU MIU",
    price: 3725,
    rating: 4
  },
  {
    imageUrl: "/images/product2.jpg",
    name: "Leather Handbag",
    brand: "MIU MIU",
    price: 2950,
    rating: 5
  },
  {
    imageUrl: "/images/product3.jpg",
    name: "Silk Blouse",
    brand: "MIU MIU",
    price: 1200,
    rating: 3
  },
  {
    imageUrl: "/images/product4.jpg",
    name: "Pleated Skirt",
    brand: "MIU MIU",
    price: 1500,
    rating: 4
  },
  {
    imageUrl: "/images/product5.jpg",
    name: "Crystal Necklace",
    brand: "MIU MIU",
    price: 890,
    rating: 5
  },
  {
    imageUrl: "/images/product6.jpg",
    name: "Embellished Pumps",
    brand: "MIU MIU",
    price: 950,
    rating: 4
  },
  {
    imageUrl: "/images/product7.jpg",
    name: "Wool Coat",
    brand: "MIU MIU",
    price: 2800,
    rating: 5
  },
  {
    imageUrl: "/images/product8.jpg",
    name: "Leather Belt",
    brand: "MIU MIU",
    price: 450,
    rating: 4
  }
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/Second-Long.png", "/Third-Long.png", "/Fourth-Long.png", "/First-Long.png",];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-black overflow-x-hidden">
      <NavbarUnauth />
      <div className="relative w-full h-[850px] overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Long Vu Fashion ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`absolute top-0 left-0 transition-opacity duration-[3000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] flex flex-col items-center z-10">
          <Image src="/Logo.png" alt="Long Vu Logo" width={400} height={800}/>
          <BuyNowButton button_text="BUY NOW" />
        </div>
      </div>
      <VideoHeader video_text_normal="LONG VU'S" video_text_bold="DESIGN" />
      <MenBodySection />
      <VideoHeaderLarge video_text_normal="WE CARE FOR" video_text_bold="CUSTOMERS" />
      <WomenBodySection />
      <VideoHeaderReverse video_text_bold="TRENDING" video_text_normal="PRODUCTS"></VideoHeaderReverse>
      <TrendingProducts 
  products={trendingProducts} 
  title="Featured Items"
  cols={{ sm: 1, md: 2, lg: 3 }}
/>
      <WhiteFooter></WhiteFooter>
    </div>
  );
}