"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import picture from "../../Images/DowloadImage/kurkure.avif";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchSubCategories } from "@/app/redux/features/getAllCategory/categorySlice";
import { serverUrl } from "@/app/redux/features/axiosInstance";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const { categories, subCategories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (activeCategory) {
      dispatch(fetchSubCategories(activeCategory._id));
    }
  }, [activeCategory, dispatch]);

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 90%)`;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-full shadow-2xl bg-white border-r w-70 p-4 z-40 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-lg font-semibold mb-4">Categories</h2>

        <div className="space-y-2 overflow-y-auto max-h-[80vh]">
          {categories.map((cat) => (
            <div key={cat._id}>
              {/* Category Button */}
              <button
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-3 w-full p-2 rounded-xl transition text-left
                  ${activeCategory?._id === cat._id
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
                <span className="text-sm text-gray-800 font-medium">{cat.Parent_name}</span>
              </button>

              {/* Subcategories */}
              {activeCategory?._id === cat._id && subCategories.length > 0 && (
                <ul className="pl-12 mt-1 space-y-1">
                  {subCategories.map((sub) => (
                    <li key={sub._id}>
                      <Link
                        href={`/pages/shop/productBysubcategory/${sub._id}`}
                        className="block p-1 rounded hover:bg-gray-100 text-gray-700 text-sm"
                      >
                        {sub.SubCategoryName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
















// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import picture from "../../Images/DowloadImage/kurkure.avif";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories, fetchSubCategories } from "@/app/redux/features/getAllCategory/categorySlice";
// import { serverUrl } from "@/app/redux/features/axiosInstance";
// import Link from "next/link";

// export default function Sidebar() {
//   const dispatch = useDispatch();
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [open, setOpen] = useState(false);
//   const { categories, subCategories, loading, error } = useSelector((state) => state.category);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (activeCategory) {
//       dispatch(fetchSubCategories(activeCategory._id));
//     }
//   }, [activeCategory, dispatch]);

//   const getRandomLightColor = () => {
//     const hue = Math.floor(Math.random() * 360);
//     return `hsl(${hue}, 100%, 90%)`;
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow"
//         onClick={() => setOpen(!open)}
//       >
//         {open ? <X size={20} /> : <Menu size={20} />}
//       </button>

//       <aside
//         className={`fixed md:static top-0 left-0 h-full shadow-2xl bg-white border-r w-70 p-4 z-40 transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <h2 className="text-lg font-semibold mb-4">Categories</h2>

//         <div className="space-y-2 overflow-y-auto max-h-[80vh]">
//           {categories.map((cat) => (
//             <div key={cat._id}>
//               {/* Category Button */}
//               <button
//                 onClick={() => setActiveCategory(cat)}
//                 className={`flex items-center gap-3 w-full p-2 rounded-xl transition text-left
//                   ${activeCategory?._id === cat._id
//                     ? "bg-gray-100 border border-gray-300"
//                     : "hover:bg-gray-50"
//                   }`}
//               >
//                 <Image
//                   src={
//                     cat?.mainCategoryImage
//                       ? `${serverUrl}/public/image/${cat.mainCategoryImage}`
//                       : picture
//                   }
//                   alt={cat.Parent_name}
//                   width={40}
//                   height={40}
//                   className="rounded-full border border-gray-200 object-cover"
//                 />
//                 <span className="text-sm text-gray-800 font-medium">{cat.Parent_name}</span>
//               </button>

//               {/* Subcategories */}
//               {activeCategory?._id === cat._id && subCategories.length > 0 && (
//                 <ul className="pl-12 mt-1 space-y-1">
//                   {subCategories.map((sub) => (
//                     <li key={sub._id}>
//                       <Link
//                         href={`/pages/shop/productBysubcategory/${sub._id}`}
//                         className="block p-1 rounded hover:bg-gray-100 text-gray-700 text-sm"
//                       >
//                         {sub.SubCategoryName}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       </aside>

//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
//         />
//       )}
//     </>
//   );
// }
