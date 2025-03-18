
 
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";

export default function HomePage() {
  

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen relative overflow-hidden">
      {/* Subtle background gradient elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
    
      <Navbar/>
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative z-10 px-6"
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Book Your Parking Slot
            </span>
            <br />
            Effortlessly
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find and reserve parking spaces with just a few taps. Simplified
            parking for a stress-free experience.
          </p>
          <div className="pt-4">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-10 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1" onClick={
              () => {
                // Navigate to the login page
                window.location.href = "/AuthPage";
                }
            }>
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Smart Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Availability",
                description:
                  "Check parking availability in real-time with live updates and notifications.",
                icon: "🔍",
              },
              {
                title: "Secure Payments",
                description:
                  "Pay securely with multiple payment options and encrypted transactions.",
                icon: "🔒",
              },
              {
                title: "User-Friendly Interface",
                description:
                  "Intuitive design that makes finding and booking parking spaces simple.",
                icon: "👆",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-xl hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="mb-6 text-3xl bg-gray-800 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center relative z-10">
        <div className="container mx-auto px-6">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Parkesac. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
