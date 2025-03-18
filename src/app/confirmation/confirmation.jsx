"use client";
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BookingDetails } from '../onj';

function Confirmation() {
  // For demo purposes
 

  if (!BookingDetails) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl p-8 text-center">
          <span className="text-3xl mb-6 inline-block">❌</span>
          <h1 className="text-xl font-semibold text-gray-200">No booking details found</h1>
          <p className="text-gray-400 mt-2">Please try booking a parking slot again</p>
        </div>
      </div>
    );
  }

  const qrData = String(BookingDetails.booking_id)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-md" id='QrCode'>
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Booking Confirmed
                </span>
              </h1>
              <div className="bg-green-500/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Booked Parking Slot</p>
                  <p className="font-medium">{BookingDetails.slot}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-medium">{BookingDetails.Destination}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="font-medium">{BookingDetails.Time}</p>
                </div>
              </div>
              
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-medium">{BookingDetails.Date}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col items-center">
            <h2 className="text-lg font-medium mb-4 text-center">
              Scan QR Code at Parking Entry
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <QRCodeSVG value={qrData} size={180} />
            </div>
            <p className="text-sm text-gray-400 text-center">
              Please have this code ready when you arrive
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 text-center">
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all" onClick={()=>{
              window.print()
            }}>
              Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;