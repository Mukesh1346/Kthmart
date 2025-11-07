// File: Navbar.jsx

    "use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Menu, User, Search, Home } from "lucide-react";
import Link from "next/link"; // remove this line if not using Next.js
import logo from "../../Images/DowloadImage/logo1.png";
import Image from "next/image";
import pic1 from '@/app/Images/DowloadImage/pic1.png'
import pic2 from '@/app/Images/DowloadImage/pic2.png'
import pic3 from '@/app/Images/DowloadImage/pic3.png'

const Navbar = () => {
  const [location, setLocation] = useState("Detecting location...");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deliveryType, setDeliveryType] = useState("standard");
  const [showMenu, setShowMenu] = useState(false);

  const categories = [
    { name: "Fruits & Veggies", href: "#" , img: pic1 },
    { name: "Dairy", href: "#" , img: pic2 },
    { name: "Bakery", href: "#" , img: pic3 },
    { name: "Beverages", href: "#" , img: pic1 }, 
  ];

  // Detect location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const display =
              data.address?.suburb ||
              data.address?.city_district ||
              data.address?.city ||
              data.address?.state ||
              "Unknown location";
            setLocation(display);
          } catch {
            setLocation("Unable to get location");
          }
        },
        () => setLocation("Location access denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <>
      {/* ===== Desktop Navbar ===== */}
      <nav className="hidden md:flex w-full bg-white shadow-sm items-center justify-between px-10 py-3 fixed top-0 left-0 z-50">
        {/* Left Section */}
        <div className="flex items-center gap-4">
            <a href="/">   <Image src={logo} alt="Logo" className=" h-10 w-30" /></a>
          {/* <h1 className="text-xl font-bold">
            hyper<span className="text-gray-800">pure</span>
          </h1>
          <span className="text-sm text-gray-500">by ZOMATO</span> */}
           <div className="ms-4">
              <span className="text-sm  ms-4 text-gray-400">Delivery in</span>
               <p className="text-sm text-gray-600">
               Guest Outlet: <span className="text-gray-800">{location}</span>
              </p>

          </div>
              <a href="/pages/categories"><p className="px-4 text-[17px]">Categories</p></a>
          </div>

           {/* Center Section */}
          <div className="flex items-center space-x-4">
           {/* <div className="">
           <span className="text-sm  ms-4 text-gray-400">Delivery in</span>
          <p className="text-sm text-gray-600">
            Guest Outlet: <span className="text-gray-800">{location}</span>
          </p>
           </div> */}
                  {/* <p className="px-4">Categories</p> */}
            <div className="flex  bg-gray-100 rounded-full overflow-hidden text-sm">
            

            {/* <button
              onClick={() => setDeliveryType("standard")}
              className={`px-10 py-2 ${
                deliveryType === "standard"
                  ? "bg-indigo-900 text-white"
                  : "text-gray-600"
              }`}
            >
              Standard
              <span className="block text-xs">next day delivery</span>
            </button>
            <button
              onClick={() => setDeliveryType("express")}
              className={`px-10 py-2 ${
                deliveryType === "express"
                  ? "bg-indigo-900 text-white"
                  : "text-gray-600"
              }`}
            >
              ⚡ Express
              <span className="block text-xs">delivery in 4hr</span>
            </button> */}
            
          </div>
          <div className="flex items-center bg-gray-100 px-6 py-4 rounded-full w-[600px] " >
            <Search className="w-4 h-4 text-red-400 mr-2" />
            <input
              type="text"
              placeholder="Search ‘Fresh Cream’"
              className="bg-transparent outline-none text-gray-600 w-full text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full w-72">
            <Search className="w-4 h-4 text-red-400 mr-2" />
            <input
              type="text"
              placeholder="Search ‘Fresh Cream’"
              className="bg-transparent outline-none text-gray-600 w-full text-sm"
            />
          </div> */}

          {isLoggedIn ? (
            <>
             <a href="/pages/cart"> <ShoppingCart className="w-6 h-6 text-gray-700" /></a>
              <Heart className="w-6 h-6 text-gray-700" />
              <Menu className="w-6 h-6 text-gray-700" />
            </>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="text-sm font-semibold text-white bg-red-500 px-4 py-2 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* ===== Mobile Navbar (Top) ===== */}
    {/* ===== Mobile Navbar (Top) ===== */}
<div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
  {/* Brand + Menu Toggle */}
  <div className="flex justify-between items-center px-4 py-3">
    <div className="flex items-center">
     <a href="/"> <Image src={logo} alt="Logo" className="h-6 w-22" /></a>
    </div>
    <button
      onClick={() => setShowMenu(!showMenu)}
      className="text-gray-700 font-semibold"
    >
      ☰
    </button>
  </div>

  {/* ===== Sidebar Menu ===== */}
  <div
    className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
      showMenu ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex justify-end p-4">
      <button
        onClick={() => setShowMenu(false)}
        className="text-gray-700 text-xl font-bold"
      >
        ×
      </button>
    </div>
    <div className="flex flex-col mt-4">
      {categories.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          <Image
            src={item.img}
            alt="catImg"
            className="h-10 w-12 mr-3 rounded"
          />
          {item.name}
        </a>
      ))}
    </div>
  </div>
</div>

      {/* ===== Mobile Navbar (Bottom) ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t flex justify-around py-4 z-50">
        <div className="flex flex-col items-center text-gray-600 text-xs">
          <Home className="w-5 h-5 mb-1" />
          <span>Home</span>
        </div>
       <a href="/pages/wishlist">
       <div className="flex flex-col items-center text-gray-600 text-xs">
          <Heart className="w-5 h-5 mb-1" />
          <span>Wishlist</span>
        </div>
       </a>
       <a href="/pages/cart">
         <div className="flex flex-col items-center text-gray-600 text-xs">
          <ShoppingCart className="w-5 h-5 mb-1" />
          <span>Cart</span>
        </div>
       </a>
        {isLoggedIn ? (
          <div className="flex flex-col items-center text-gray-600 text-xs">
            <User className="w-5 h-5 mb-1" />
            <span>Profile</span>
          </div>
        ) : (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="flex flex-col items-center text-[#f24e5e] text-xs"
          >
            <User className="w-5 h-5 mb-1" />
            <span>Login</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;

















// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Heart, ShoppingCart, User, Home, MapPin } from "lucide-react";
// import "./navbar.css";
// import logo from "../../Images/DowloadImage/logo1.png";
// import Image from "next/image";
// import LoginSidebar from "../LoginSidebar/LoginSidebar";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);

//   const categories = [
//     { name: "Browse catalogue", href: "#", badge: "NEW" },
//     // { name: "Quality", href: "#" },
//     // { name: "Sustainability", href: "#" },
//   ];

//   // ------------------ AUTO REQUEST LOCATION ON MOUNT ------------------
//   useEffect(() => {
//     const askLocation = () => {
//       if (!navigator.geolocation) {
//         alert("Geolocation is not supported by your browser.");
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           // setUserLocation({ latitude, longitude });
//           console.log(`Location granted: Lat ${latitude}, Lng ${longitude}`);
//         },
//         (error) => {
//           console.warn("Location denied:", error);
//           // alert can be uncommented if you want a visible message
//           // alert("Please allow location to continue!");
//         }
//       );
//     };

//     // Ask immediately
//     askLocation();

//     // Keep asking every 5 seconds until user grants permission
//     const intervalId = setInterval(() => {
//       if (!userLocation) {
//         askLocation();
//       } else {
//         clearInterval(intervalId);
//       }
//     }, 5000);

//     // Clean up interval on unmount
//     return () => clearInterval(intervalId);
//   }, [userLocation]);

//   return (
//     <>
//       {/* ---------- DESKTOP NAVBAR ---------- */}
//       <nav className="hidden md:flex justify-between items-center px-10 py-4 bg-white shadow-sm navbar">
//         {/* LEFT: Logo + Location */}
//         <div className="flex items-center space-x-8">
//           <div className="flex items-center space-x-1">
//             <Image src={logo} alt="Logo" className=" h-10 w-30" />
//             {/* <div className="flex flex-col leading-tight">
//               <span className="font-extrabold text-xl text-gray-900">hyperpure</span>
//               <span className="text-xs tracking-wider text-gray-500">BY ZOMATO</span>
//             </div> */}
//           </div>

//           {/* Location */}
//           <div className=" flex items-center items-center space-x-2 text-gray-600">
//          <div>
//          <span className="text-sm  ms-4 text-gray-400">Delivery in</span>
//             <button
//               className="flex items-center text-gray-700 font-medium hover:text-[#f24e5e] transition"
//             >
//               <MapPin size={16} className="mr-1" />
//               {userLocation ? "Your Location" : "Select Location"}
//             </button>
//          </div>

//             <div className="flex items-center space-x-8 font-medium text-xl ms-4 text-gray-800">
//           {categories.map((item) => (
//             <div key={item.name} className="relative  flex items-center">
//               <Link href={item.href}>{item.name}</Link>
//               {item.badge && (
//                 <span className="absolute -top-2 -right-6 text-[10px] text-red-500 font-bold">
//                   {item.badge}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>


//           </div>
//         </div>

//         {/* CENTER: Menu Links */}
//         {/* <div className="flex items-center space-x-8 font-medium text-gray-800">
//           {categories.map((item) => (
//             <div key={item.name} className="relative  flex items-center">
//               <Link href={item.href}>{item.name}</Link>
//               {item.badge && (
//                 <span className="absolute -top-2 -right-6 text-[10px] text-red-500 font-bold">
//                   {item.badge}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div> */}

//         {/* RIGHT: Auth / Profile */}
//         <div className="flex items-center space-x-6">
//           {!isLoggedIn ? (
//             <div className="flex gap-4">

//               <button
//                 onClick={() => setIsLoggedIn(true)}
//                 className="bg-[#f24e5e] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
//               >
//               Already  Login 
//               </button>
//               <div >
//             <LoginSidebar />
//           </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4 ">
//               <div className="nav-item">
//                 <User />
//                 <span>Profile</span>
//               </div>
//               <div className="nav-item">
//                 <Heart />
//                 <span>Wishlist</span>
//               </div>
//               <div className="nav-item">
//                 <ShoppingCart />
//                 <span>Cart</span>
//               </div>
//             </div>
//           )}
        
//         </div>
//       </nav>

//       {/* ---------- MOBILE NAVBAR ---------- */}
//       <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
//         {/* Brand + Menu Toggle */}
//         <div className="flex justify-between items-center px-4 py-3">
//           <div className="flex items-center">
//             <img src="/logo.svg" alt="Logo" className="h-6" />
//             <span className="font-bold text-lg ml-2">hyperpure</span>
//           </div>
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="text-gray-700 font-semibold"
//           >
//             ☰
//           </button>
//         </div>

//         {/* Dropdown Menu */}
//         {showMenu && (
//           <div className="bg-gray-50 border-t border-gray-200">
//             {categories.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Bottom Navbar (Mobile) */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t flex justify-around py-2 z-50">
//         <div className="mobile-item">
//           <Home />
//           <span>Home</span>
//         </div>
//         <div className="mobile-item">
//           <Heart />
//           <span>Wishlist</span>
//         </div>
//         <div className="mobile-item">
//           <ShoppingCart />
//           <span>Cart</span>
//         </div>
//         {isLoggedIn ? (
//           <div className="mobile-item">
//             <User />
//             <span>Profile</span>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsLoggedIn(true)}
//             className="mobile-item text-[#f24e5e]"
//           >
//             <User />
//             <span>Login</span>
//           </button>
//         )}
//       </div>
//     </>
//   );
// }
