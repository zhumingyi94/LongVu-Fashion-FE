import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import ProductCardDetail from '@/components/ui/ProductCardDetail'
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct'
import { useRouter } from 'next/router'

export default function ProductDetail() {
  const router = useRouter()
  const { productId } = router.query

  // Fetch product details based on productId
  // This is where you'd normally fetch data from an API

  return (
    <div>
      <NavbarAuth></NavbarAuth>
      <div className="bg-black">
        <ProductCardDetail imageUrl="/DressTestpng.png"></ProductCardDetail>
        <VideoHeaderProduct></VideoHeaderProduct>
    </div>
      <WhiteFooter></WhiteFooter>
    </div>
  )
}
