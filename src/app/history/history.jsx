"use client";
import React, { useState, useEffect } from 'react';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Dummy booking data for demonstration
  useEffect(() => {
    const dummyBookings = [
      {
        slot: "B1",
        place: "Downtown Parking Plaza",
        time: "3:00 PM - 6:00 PM",
        date: "March 15, 2025",
        cash: "₹200"
      },
      {
        slot: "B2",
        place: "City Center Parking",
        time: "9:00 AM - 12:00 PM",
        date: "March 16, 2025",
        cash: "₹150"
      },
      {
        slot: "B3",
        place: "Airport Parking Lot",
        time: "12:00 PM - 3:00 PM",
        date: "March 17, 2025",
        cash: "₹300"
      }
    ];
    setBookings(dummyBookings);
  }, []);

  // Handle click on a booking to show details
  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6">
      
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>
      <div className="z-10 w-full max-w-md">
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-3xl font-extrabold text-white mb-6">📖 Booking History</h1>
            <ul className="space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <li
                    key={index}
                    onClick={() => handleBookingClick(booking)}
                    className="p-4 bg-gray-800 hover:bg-indigo-600 rounded-xl cursor-pointer transition-all duration-300 ease-in-out flex justify-between items-center"
                  >
                    <div>
                      <div className="text-lg font-semibold text-purple-400">🕒 Slot: {booking.slot}</div>
                      <div className="text-gray-400">📅 Booked on: {booking.date}</div>
                    </div>
                    <span className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full">View</span>
                  </li>
                ))
              ) : (
                <p className="p-6 text-gray-300 text-center">No bookings available.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Selected Booking Details */}
        {selectedBooking && (
          <div className="mt-8 w-full max-w-md bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl p-6 transform transition-all scale-105">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">📜 Booking Details</h2>
            <p className="text-gray-300"><strong>🕒 Slot:</strong> {selectedBooking.slot}</p>
            <p className="text-gray-300"><strong>📍 Place:</strong> {selectedBooking.place || 'N/A'}</p>
            <p className="text-gray-300"><strong>⏳ Time:</strong> {selectedBooking.time || 'N/A'}</p>
            <p className="text-gray-300"><strong>💰 Cash:</strong> {selectedBooking.cash || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default BookingHistory;
