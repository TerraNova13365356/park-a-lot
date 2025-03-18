import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanDetails } from "../onj";

const QRScanner = () => {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState("");
  let navigate=useNavigate()
  useEffect(() => {
    if (!window.Html5Qrcode) return;

    if (!scannerRef.current) {
      scannerRef.current = new window.Html5Qrcode("qr-reader");

      scannerRef.current
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            setScannedText(decodedText);
            ScanDetails.ScanId=decodedText
           navigate("/CheckIn")
          },
          (error) => {
            console.warn("Scan error:", error);
          }
        )
        .then(() => setIsScanning(true))
        .catch(console.error);
    }

    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().then(() => {
          setIsScanning(false);
          scannerRef.current = null;
        }).catch((error) => console.error("Error stopping scanner:", error));
      }
    };
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      
      <div id="qr-reader" className="w-72 h-72 bg-gray-800 rounded-lg shadow-lg"></div>

      {scannedText && (
        <p className="mt-4 text-lg font-semibold text-green-400">
          Scanned Result: {scannedText}
        </p>
      )}

      <button
        onClick={() => {
          if (scannerRef.current && isScanning) {
            scannerRef.current.stop().then(() => {
              setIsScanning(false);
              scannerRef.current = null;
            });
          }
        }}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Stop Scanner
      </button>
    </div>
  );
};

export default QRScanner;
