import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for routing

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/90 backdrop-blur-md py-3 shadow-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Parke4-Lot
          </h1>
          <nav>
            <ul className="flex space-x-8">
              {["Home", "Contact us", "About"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`} // Dynamically generate links based on item names
                    className="relative text-sm font-medium tracking-wide hover:text-white transition-colors"
                  >
                    <span className="relative pb-1">
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
