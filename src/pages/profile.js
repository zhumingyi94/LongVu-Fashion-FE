import React, { useState } from 'react';
import Image from 'next/image';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';

const Profile = () => {
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState('');

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignOut = () => {
        router.push('/');
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validation
        if (!username || !phone || !email) {
            setNotification('Please fill all fields.');
            return;
        }

        // Fetch userId and token from localStorage
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('toklocalen');

        if (!userId || !token) {
            setNotification('No user ID or authentication token found.');
            return;
        }

        try {
            const response = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    password: '12345678', // Assuming you have a mechanism to handle passwords
                    email,
                    phone,
                    roles: ['ADMIN']
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setNotification('Profile updated successfully.');
        } catch (error) {
            setNotification(`Error: ${error.message}`);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-montserrat">
            <NavbarAuth />
            <div className="flex-grow container mx-auto py-8">
                <nav className="mb-4 mt-4 ml-[-100px]">
                    <a href="/" className="inline-flex items-center gap-[6.364px] text-[25.455px] font-normal" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
                        Home
                        <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mr-[8px]" />
                    </a>
                    <a href="/admin" className="inline-flex items-center gap-[6.364px] text-[25.455px] font-normal" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
                        User
                        <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mr-[8px]" />
                    </a>
                    <span className="text-white text-[25.455px]">Profile</span>
                </nav>

                <h1 className="font-kaushan text-[71px] mb-8 ml-[-100px]">Change your profile</h1>

                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-gray-700 w-full aspect-square relative overflow-hidden">
                            {image ? (
                                <Image src={image} alt="Product" layout="fill" objectFit="cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <label htmlFor="image-upload" className="cursor-pointer text-[20px] bg-white font-bold text-black py-2 px-4"
                                    style={{
                                        background: 'transparent',
                                        border: '2px solid transparent',
                                        borderImage: 'linear-gradient(90deg, #05FFF0, #064CFF) 1',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        backgroundImage: 'linear-gradient(90deg, #05FFF0, #064CFF)',
                                    }}>
                                        Upload Image
                                    </label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <form className="w-full space-y-6" onSubmit={handleUpdate}>
                            <div>
                                <label className="text-white font-montserrat mb-2 text-[20px]">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                                    style={{ lineHeight: 'normal' }}
                                />
                            </div>

                            <div>
                                <label className="text-white font-montserrat mb-2 text-[20px]">Phone number</label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                                    style={{ lineHeight: 'normal' }}
                                />
                            </div>

                            <div>
                                <label className="text-white font-montserrat mb-2 text-[20px]">Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                                    style={{ lineHeight: 'normal' }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="group w-full bg-white text-black font-montserrat py-3 px-4 font-bold text-[20px] border border-white transition-all duration-300 ease-in-out hover:bg-transparent !mt-[40px]"
                            >
                                <span className="group-hover:text-white transition-colors duration-300 ease-in-out">Change your profile</span>
                            </button>
                            <button onClick={handleSignOut}
                                type="button"
                                className="group w-full bg-transparent text-white font-montserrat py-3 px-4 font-bold text-[20px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black !mt-[40px]"
                            >
                                <span className="group-hover:text-black transition-colors duration-300 ease-in-out">SIGN OUT</span>
                            </button>
                        </form>

                        {/* Notification */}
                        {notification && (
                            <div className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50 transition-opacity duration-300">
                                {notification}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <WhiteFooter />
        </div>
    );
};

export default Profile;
