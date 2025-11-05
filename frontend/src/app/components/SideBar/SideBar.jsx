"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import picture from "../../Images/DowloadImage/kurkure.avif";
import React, { useEffect, useMemo } from "react";
import pic1 from '@/app/Images/DowloadImage/pic1.png'
import pic2 from '@/app/Images/DowloadImage/pic2.png'
import pic3 from '@/app/Images/DowloadImage/pic3.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/features/getAllCategory/categorySlice";
import { serverUrl } from "@/app/redux/features/axiosInstance";
// const categories = [
//   { name: "Cheese", img:pic1  },
//   { name: "Fresh Milk & Cream", img : pic2 },
//   { name: "Curd", img : pic3  },
//   { name: "Margarine", img:  pic2  },
//   { name: "Ghee", img : pic1  },
//   { name: "Paneer", img:  pic3  },
//   { name: "Fresh Cheese", img: pic2  },
//   { name: "Ice Cream", img: pic1  },
// ];

export default function Sidebar() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Cheese");
  const [open, setOpen] = useState(false);
  const { categories, subCategories, loading, error  } = useSelector((state) => state.category);
          console.log(subCategories)         



          const getRandomLightColor = () => {
            const hue = Math.floor(Math.random() * 360); // hue between 0-360
            const pastel = `hsl(${hue}, 100%, 90%)`; // pastel background using HSL
            return pastel;
          };


          useEffect(() => {
            dispatch(fetchCategories());
          }, [dispatch]);


  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed  top-4 left-4 z-50 p-2 bg-white rounded-full shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-full shadow-2xl bg-white border-r w-70 p-4 z-40 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-lg font-semibold mb-4">Dairy</h2>

        <div className="space-y-2 overflow-y-auto max-h-[80vh]">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActive(cat.Parent_name)}
              className={`flex items-center gap-3 w-full p-2 rounded-xl transition text-left
              ${
                active === cat.Parent_name
                  ? "bg-gray-100 border border-gray-300"
                  : "hover:bg-gray-50"
              }`}
            >
              <Image               
                 src={
                  cat?.mainCategoryImage
                    ? `${serverUrl}/public/image/${cat.mainCategoryImage}`
                    : picture
                }
                alt={cat.Parent_name}
                width={40}
                height={40}
                className="rounded-full border border-gray-200 object-cover"
              />
              <span className="text-sm text-gray-800 font-medium">
                {cat.Parent_name}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}
    </>
  );
}
