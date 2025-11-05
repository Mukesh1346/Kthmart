"use client";
import { useState } from "react";
import "./FilterCategories.css";

export default function FilterCategories() {
  const categories = [
    "Dairy",
    "Masala, Salt & Sugar",
    "Packaging Material",
    "Sauces & Seasoning",
    "Canned & Imported Items",
    "Chicken & Eggs",
  ];

  const [active, setActive] = useState("Dairy");

  return (
    <div className="bg-white rounded-xl shadow-sm flex items-center gap-3 overflow-x-auto no-scrollbar px-3 sm:px-4 py-3 sm:py-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`whitespace-nowrap text-xs sm:text-sm md:text-base px-3 py-1.5 font-medium transition-all rounded-md ${
            active === cat
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
