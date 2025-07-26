/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Link from 'next/link';

type Props = {
  product: {
    id: number;
    image: string;
    title: string;
    price: number;
  };
};

const sizes = ['Small', 'Medium', 'Large'];
const inStock = () => Math.random() > 0.3;

export default function ProductCard({ product }: Props) {
  const [variant, setVariant] = useState(sizes[0]);
  const available = inStock();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 p-5 flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-52 w-full object-contain mb-4 transition-transform duration-200 hover:scale-105"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">
        {product.title}
      </h2>

      <p className="text-xl font-bold text-[#ff6f61] mb-3">${product.price}</p>

      <label
        className="text-sm text-gray-600 mb-1"
        htmlFor={`variant-${product.id}`}
      >
        Choose Size
      </label>
      <select
        id={`variant-${product.id}`}
        className="border px-3 py-2 mb-4 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff6f61] transition"
        value={variant}
        onChange={(e) => setVariant(e.target.value)}
      >
        {sizes.map((size) => (
          <option key={size}>{size}</option>
        ))}
      </select>

      {available ? (
        <button className="mt-auto bg-[#ff6f61] hover:bg-[#ff3b2e] text-white font-medium py-2 rounded-lg transition-colors duration-200">
          Add to Cart
        </button>
      ) : (
        <button
          disabled
          className="mt-auto bg-gray-200 text-gray-500 py-2 rounded-lg cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}

      <Link
        href={`/product/${product.id}`}
        className="mt-4 text-sm text-[#ff6f61] hover:text-[#ff3b2e] font-medium self-start transition-colors"
      >
        View Details →
      </Link>
    </div>
  );
}
