import Link from 'next/link';
import Navbar from './NavBar';
import ProductCard from '@/components/ProductCard';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default async function HomePage() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products: Product[] = await res.json();

  return (
    <main className="scroll-smooth w-full">
      <Navbar />

      <section
        id="home"
        className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fff5f2] text-center px-6 py-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#ff6f61]">
          Welcome to CreamyStore
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">
          Explore the finest range of lifestyle, fashion, and tech products —
          curated for your everyday excellence.
        </p>
        <Link
          href="#products"
          className="bg-[#ff6f61] hover:bg-[#ff5a4d] text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Shop Now
        </Link>
      </section>

      <section id="products" className="py-10 px-6 bg-[#fdf1ec]">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-[#ff6f61]">
          Explore Our Products
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Browse our curated collection of quality products crafted to enhance
          your lifestyle.
        </p>
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="about" className="py-16 px-6 bg-[#fffaf8] text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-[#ff6f61]">
          About Us
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          At CreamyStore, we’re passionate about blending style with
          functionality. We bring you handpicked fashion, tech, and home
          products that inspire modern living.
        </p>
      </section>

      <section id="contact" className="py-16 px-6 bg-[#ffffff] text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-[#ff6f61]">
          Contact Us
        </h2>
        <p className="text-gray-700 text-lg">
          Got questions or feedback? We&apos;d love to hear from you.
          <br />
          Email us at{' '}
          <a
            href="mailto:support@creamystore.com"
            className="text-[#ff6f61] underline font-medium"
          >
            support@creamystore.com
          </a>
        </p>
      </section>
    </main>
  );
}
