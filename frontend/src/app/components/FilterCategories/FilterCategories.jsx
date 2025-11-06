"use client";
import { useEffect, useState } from "react";
import "./FilterCategories.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/app/redux/features/getAllCategory/categorySlice";

export default function FilterCategories() {
 const dispatch = useDispatch();
const [activeCategory, setActiveCategory] = useState(null);
const {categories,loading, error} = useSelector((state)=> state.category  );


useEffect( ()=>{
  dispatch(fetchCategories());
},[dispatch] );


useEffect(()=>{
  if(activeCategory){
    dispatch(fetchCategories(activeCategory._id));
  }
},[activeCategory, dispatch])


const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 90%)`;
};
  // const categories = [
  //   "Dairy",
  //   "Masala, Salt & Sugar",
  //   "Packaging Material",
  //   "Sauces & Seasoning",
  //   "Canned & Imported Items",
  //   "Chicken & Eggs",
  // ];

  const [active, setActive] = useState("Dairy");

  return (
    <div className="bg-white rounded-xl shadow-sm flex items-center gap-3 overflow-x-auto no-scrollbar px-3 sm:px-4 py-3 sm:py-4">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => setActive(cat)}
          className={`whitespace-nowrap text-xs sm:text-sm md:text-base px-3 py-1.5 font-medium transition-all rounded-md ${
            active === cat
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
         {cat.Parent_name}
        </button>
      ))}
    </div>
  );
}



























// "use client";
// import { useState } from "react";
// import "./FilterCategories.css";

// export default function FilterCategories() {
//   const categories = [
//     "Dairy",
//     "Masala, Salt & Sugar",
//     "Packaging Material",
//     "Sauces & Seasoning",
//     "Canned & Imported Items",
//     "Chicken & Eggs",
//   ];

//   const [active, setActive] = useState("Dairy");

//   return (
//     <div className="bg-white rounded-xl shadow-sm flex items-center gap-3 overflow-x-auto no-scrollbar px-3 sm:px-4 py-3 sm:py-4">
//       {categories.map((cat) => (
//         <button
//           key={cat}
//           onClick={() => setActive(cat)}
//           className={`whitespace-nowrap text-xs sm:text-sm md:text-base px-3 py-1.5 font-medium transition-all rounded-md ${
//             active === cat
//               ? "text-black border-b-2 border-black"
//               : "text-gray-600 hover:text-black"
//           }`}
//         >
//           {cat}
//         </button>
//       ))}
//     </div>
//   );
// }
