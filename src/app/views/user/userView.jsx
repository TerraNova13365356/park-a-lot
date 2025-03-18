
import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase/firebaseConfig"; // Assuming firebaseConfig is correctly set up
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
       // Redirect to login if no user is logged in
       navigate("/AuthPage");
    } else {
      setUser(currentUser);
      // You can fetch bookings from your database or local storage if needed
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to login page after successful logout
        navigate("/AuthPage");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Navigate to Slot Booking Page
  const navigateToSlotBooking = () => {
    // Adjust the path according to your app's routing
    navigate("/Location-Selection");
  };

  // Navigate to Booking History Page
  const navigateToBookingHistory = () => {
    navigate("/history"); // Adjust the path according to your app's routing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col items-center ">
      {/* Navigation Bar */}
      <div className="w-56 max-w-md h-20 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl p-8 mt-10">
        <h1 className="text-xl font-extrabold text-center text-white mb-6">
          Welcome, {user ? user.displayName : "User"}
        </h1>

        {/* Logout Button */}
        {/* <button
          onClick={handleLogout}
          className="w-full py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg"
        >
          Logout
        </button> */}
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-md mt-6 bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Dashboard</h2>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <button
            onClick={navigateToSlotBooking}
            className="w-full py-2 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-lg"
          >
            Book a Parking Slot
          </button>
          <button
            onClick={navigateToBookingHistory}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg"
          >
            View Booking History
          </button>
        </div>

        {/* Description About Booking */}
        <div className="mt-6 text-gray-800">
          <h3 className="text-xl font-semibold mb-2">How to Book a Parking Slot</h3>
          <p>
            Booking a parking slot is easy! Just click on the "Book a Parking Slot" button, choose your preferred
            slot from available options, and confirm your booking. You can then view your booking details under the
            "View Booking History" section.
          </p>
        </div>
      </div>

      {/* Booking History Section */}
       
    </div>
  );
}

export default Dashboard;
