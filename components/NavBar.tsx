'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-[#fff5f2] shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-extrabold text-[#ff6f61] tracking-tight"
        >
          CreamyStore
        </Link>
        <div className="space-x-6 hidden md:flex">
          {['home', 'products', 'about', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="text-gray-600 hover:text-[#ff6f61] font-bold transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
