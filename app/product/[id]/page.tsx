/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Navbar from '@/components/NavBar';
import ProductSkeleton from '@/components/ProductSkeleton';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products`);
        const data: Product[] = await res.json();
        const filtered = data.filter(
          (p) => p.category === product?.category && p.id !== product?.id
        );
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    }

    if (product) fetchRelated();
  }, [product]);

  return (
    <>
      <Head>
        <title>{product?.title || 'Product Detail'} | CreamyStore</title>
        <meta name="description" content={product?.description.slice(0, 150)} />
        <meta property="og:title" content={product?.title} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.image} />
      </Head>

      <Navbar />
      <section className="min-h-screen bg-white px-4 py-10 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          {product && (
            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:underline text-[#ff6f61]">
                Home
              </Link>{' '}
              /{' '}
              <span className="capitalize hover:underline text-[#ff6f61]">
                {product.category}
              </span>{' '}
              / <span>{product.title.slice(0, 40)}...</span>
            </nav>
          )}

          {/* Product Content */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {loading ? (
              <ProductSkeleton />
            ) : product ? (
              <>
                <div className="flex justify-center items-center bg-gray-100 p-8 rounded-lg h-[500px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-4">
                  <h1 className="text-3xl font-bold text-gray-700">
                    {product.title}
                  </h1>
                  <p className="text-[#ff6f61] text-2xl font-semibold">
                    ${product.price}
                  </p>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-sm text-gray-600">
                    Category:{' '}
                    <span className="capitalize">{product.category}</span>
                  </p>
                  {product.rating && (
                    <p className="text-sm text-gray-600">
                      Rating: {product.rating.rate} ⭐ ({product.rating.count}{' '}
                      reviews)
                    </p>
                  )}
                  <button className="mt-4 bg-[#ff6f61] hover:bg-[#ff3b2e] text-white px-6 py-3 rounded-md transition">
                    Add to Cart
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20">Product not found.</div>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h3 className="text-2xl font-semibold mb-6 text-[#ff6f61]">
                Related Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <div className="border rounded p-4 hover:shadow-md transition">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-40 object-contain mx-auto"
                      />
                      <h4 className="mt-2 text-gray-700 font-medium text-sm">
                        {p.title.slice(0, 50)}
                      </h4>
                      <p className="text-[#ff6f61] font-bold mt-1">
                        ${p.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
}
