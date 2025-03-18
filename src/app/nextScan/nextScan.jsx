import React from 'react';

const ScanPage = () => {
  const handleScanClick = () => {
    // Function to handle scanning - would integrate with camera/QR API
    window.location.replace("/Qr-Code")
    // Add your QR scanning functionality here
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">QR Scanner</h1>
          <p className="text-gray-400 mb-8 text-center">Press the button below to scan a QR code</p>
          
          <button
            onClick={handleScanClick}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Scan Another QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;