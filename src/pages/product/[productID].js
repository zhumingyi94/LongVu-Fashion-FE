import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import ProductCardDetail from '@/components/ui/ProductCardDetail'
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct'
import { useRouter } from 'next/router'
import ProductGallery from '@/components/layout/ProductGallery'

const products = [
    {
      imageUrl: '/products/product1.jpg',
      name: 'Product 1',
      brand: 'Brand A',
      price: '99.99',
    },
    {
      imageUrl: '/products/product2.jpg',
      name: 'Product 2',
      brand: 'Brand B',
      price: '149.99',
    },
    {
      imageUrl: '/products/product3.jpg',
      name: 'Product 3',
      brand: 'Brand C',
      price: '199.99',
    },
    // Add more products as needed
  ];
  
export default function ProductDetail() {
  const router = useRouter()
  const { productId } = router.query

  // Fetch product details based on productId
  // This is where you'd normally fetch data from an API

  return (
    <div>
      <NavbarAuth></NavbarAuth>
      <div className="bg-black">
      <ProductGallery products={products} />
        <VideoHeaderProduct></VideoHeaderProduct>
    </div>
      <WhiteFooter></WhiteFooter>
    </div>
  )
}
