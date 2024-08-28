import React, { useState, useEffect } from 'react';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function VirtualTryOn() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const { productLink } = router.query;

  useEffect(() => {
    if (productLink) {
      setProductImage(productLink);
    }
  }, [productLink]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);
    }
  };

  const handleExecute = async () => {
    if (!uploadedImage || !productImage) {
      setErrorMessage("Please upload a face image and provide a product image link.");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage(null);
  
    const formData = new FormData();
    formData.append('face_image', uploadedImage);
    formData.append('commerce_image', productImage);
  
    try {
      const response = await fetch('/api/virtual-try-on', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      // Handle the response directly
      if (data && typeof data === 'string') {
        setResultImage(data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error during virtual try-on:', error);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavbarAuth />
      <div className="flex-grow px-8 py-6 pb-60">
        <nav className="flex items-center mb-8 text-sm text-gray-400">
          <a href="/home" className="hover:text-white">Home</a>
          <span className="mx-2">{'>'}</span>
          <a href="/ai-service" className="hover:text-white">AI Service</a>
          <span className="mx-2">{'>'}</span>
          <span className="text-white">Virtual Try-on (Beta)</span>
        </nav>

        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold font-montserrat pt-4">Upload image of yourself</h2>
          <div className="text-cyan-400 font-bold flex items-center mr-[130px]">
            <Image src="/VTOn.png" alt="Virtual Try On" width={300} height={40} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[591px]">
            <div className="h-[728px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              {uploadedImageUrl ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={uploadedImageUrl} 
                    alt="Uploaded image" 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
              ) : (
                <div className="text-center p-4">
                  <label htmlFor="upload-input" className="cursor-pointer">
                    <div className="relative overflow-hidden p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_1rem_rgba(5,255,240,0.5)]">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#05FFF0] to-[#064CFF]"></div>
                      <div className="relative bg-black px-6 py-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05FFF0] to-[#064CFF] font-bold">
                          Upload Image
                        </span>
                      </div>
                    </div>
                    <input
                      id="upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mx-4">
            <button
              onClick={handleExecute}
              disabled={isLoading}
              className="relative p-[2px] overflow-hidden group transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#05FFF0]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#05FFF0_0%,#064CFF_50%,#05FFF0_100%)] group-hover:animate-[spin_1s_linear_infinite]" />
              <span className="relative flex items-center justify-center bg-black px-4 py-1 transition-all duration-300 ease-in-out group-hover:bg-gray-900">
                {isLoading ? (
                  <span className="text-white">Processing...</span>
                ) : (
                  <Image 
                    src="/Execute_grad.png" 
                    alt="Execute" 
                    width={200} 
                    height={70} 
                    className="transition-all duration-300 ease-in-out group-hover:brightness-110"
                  />
                )}
              </span>
            </button>
          </div>

          <div className="w-[591px]">
            <div className="h-[728px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-400"></div>
                  <p className="mt-4 text-cyan-400">Processing your image...</p>
                </div>
              ) : resultImage ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={resultImage} 
                    alt="Try-on result" 
                    layout="fill" 
                    objectFit="contain"
                  />
                </div>
              ) : (
                <div className="text-center p-4">
                  <p className="text-gray-400">Virtual try-on result will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {errorMessage}
          </div>
        )}

        {productImage && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg text-white w-[590px]">
            <h3 className="text-xl font-bold mb-8">Clothes that you want to try-on</h3>
            <Image src={productImage} width={533} height={733}></Image>
          </div>
        )}
      </div>
      <WhiteFooter />
    </div>
  );
}
