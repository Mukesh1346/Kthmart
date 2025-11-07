"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "@/app/redux/features/getAllCategory/categorySlice";
import { serverUrl } from "@/app/redux/features/axiosInstance";
import Link from "next/link";
import CallBackImg from "../../Images/DBS/DBSLOGO.jpg";

export default function Sidebar({ categoryId }) {
  const dispatch = useDispatch(); 
   const { subCategories, loading, error } = useSelector(
    (state) => state.category
  );     

  useEffect(() => {       
    if (categoryId) {
      dispatch(fetchSubCategories(categoryId));
    }
  }, [dispatch, categoryId]);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading subcategories...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading subcategories.</div>;
  }

  if (!subCategories || subCategories.length === 0) {
    return <div className="p-4 text-gray-500">No subcategories found.</div>;
  }

  return (
    <aside className="w-full bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
      <ul className="space-y-2">
        {subCategories.map((sub) => (
          <li key={sub._id}>
            <Link
              href={`/pages/shop/productBysubcategory/${sub._id}`}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
            >
              <img
                src={
                  sub.categoryImage
                    ? `${serverUrl}/public/image/${sub.categoryImage}`
                    : CallBackImg
                }
                alt={sub.SubCategoryName}
                className="w-10 h-10 object-cover rounded-full border border-gray-200"
              />
              <span className="text-gray-700 font-medium text-sm">
                {sub.SubCategoryName}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
