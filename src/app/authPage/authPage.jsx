"use client";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from "../../firebase/firebaseConfig"; // Import from firebaseConfig
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Modular imports for Firebase methods

function AuthPage() {
    const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password); // Use the modular function for signup
        navigate("/dashboard") // Redirect to dashboard after signup
      } else {
        await signInWithEmailAndPassword(auth, email, password); // Use the modular function for login
        navigate("/dashboard") // Redirect to dashboard after login
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  // Google Login handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Facebook Login handler
  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center text-white mb-4">
              {isSignup ? "Sign Up" : "Login"}
            </h1>
  
            {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display errors */}
  
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-700"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg border border-gray-700"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg ${loading ? "opacity-50" : ""}`}
                disabled={loading}
              >
                {loading
                  ? isSignup
                    ? "Signing Up..."
                    : "Logging In..."
                  : isSignup
                  ? "Sign Up"
                  : "Login"}
              </button>
            </form>
  
            <div className="mt-4 text-center">
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-400 cursor-pointer"
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </span>
            </div>
  
            <div className="mt-4 flex justify-center space-x-4">
              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-28 py-2 bg-red-500 text-white rounded-lg"
              >
                Google
              </button>
  
              {/* Facebook Login Button */}
              <button
                onClick={handleFacebookLogin}
                className="w-28 py-2 bg-blue-600 text-white rounded-lg"
              >
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AuthPage

