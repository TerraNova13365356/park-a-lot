import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ref, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { BookingDetails } from "../onj";
import { getCurrentDate } from "../../utils/date";

const ParkingLot = () => {
  const [parkingData, setParkingData] = useState({ grid: [], slotLabels: [], numRows: 0, numCols: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previousSlot, setPreviousSlot] = useState(null);
  const [currentSlot, setCurrentSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const parkRef = ref(db, `Parking/${BookingDetails.State}/${BookingDetails.District}/${BookingDetails.Destination}/parkingLayout`);

    const unsubscribe = onValue(parkRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()["parkingLayout"];
        if (data && Array.isArray(data.grid)) {
          setParkingData({
            grid: data.grid,
            slotLabels: Array.isArray(data.slotLabels) ? data.slotLabels : [],
            numRows: data.numRows || 0,
            numCols: data.numCols || 0,
          });

          let foundSelected = null;
          data.grid.forEach((row, rowIndex) =>
            row.forEach((cell, colIndex) => {
              if (cell === "S") foundSelected = { 
                rowIndex, 
                colIndex,
                label: data.slotLabels?.[rowIndex]?.[colIndex] || `R${rowIndex+1}C${colIndex+1}`
              };
            })
          );
          setSelectedSlot(foundSelected);
        } else {
          setParkingData({ grid: [], slotLabels: [], numRows: 0, numCols: 0 });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSlotClick = async (rowIndex, colIndex) => {
    if (!Array.isArray(parkingData.grid) || !parkingData.grid[rowIndex]) return;
    if (parkingData.grid[rowIndex][colIndex] !== "P") return;

    setIsUpdating(true);
    try {
      // if (selectedSlot) {
      //   const prevSlotRef = ref(db, `parkingLayout/parkingLayout/grid/${selectedSlot.rowIndex}/${selectedSlot.colIndex}`);
      //   await set(prevSlotRef, "P");
      // }

      const slotLabel = parkingData.slotLabels?.[rowIndex]?.[colIndex] || `R${rowIndex+1}C${colIndex+1}`;
      const slotRef = ref(db, `Parking/${BookingDetails.State}/${BookingDetails.District}/${BookingDetails.Destination}/parkingLayout/parkingLayout/grid/${rowIndex}/${colIndex}`);
      await set(slotRef, "S");
      
      setSelectedSlot({ rowIndex, colIndex, label: slotLabel });
      setConfirmationOpen(true);
    } catch (error) {
      console.error("Error selecting slot:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelSelection = async () => {
    if (selectedSlot) {
      setIsUpdating(true);
      try {
        const slotRef = ref(db, `Parking/${BookingDetails.State}/${BookingDetails.District}/${BookingDetails.Destination}/parkingLayout/parkingLayout/grid/${selectedSlot.rowIndex}/${selectedSlot.colIndex}`);
        await set(slotRef, "P");
        setSelectedSlot(null);
      } catch (error) {
        console.error("Error canceling selection:", error);
      } finally {
        setIsUpdating(false);
      }
    }
    setConfirmationOpen(false);
  };

  const getSlotColor = (cellType) => {
    switch(cellType) {
      case "P": return { bg: "bg-emerald-600", hover: "hover:bg-emerald-500", cursor: "cursor-pointer" };
      case "S": return { bg: "bg-amber-500", hover: "", cursor: "" };
      case "B": return { bg: "bg-gray-700", hover: "", cursor: "" };
      case "R": return { bg: "bg-gray-600", hover: "", cursor: "" };
      case "E": return { bg: "bg-blue-600", hover: "", cursor: "" };
      case "X": return { bg: "bg-red-600", hover: "", cursor: "" };
      default: return { bg: "bg-gray-900", hover: "", cursor: "" };
    }
  };

  const getLegendLabel = (code) => {
    switch(code) {
      case "P": return "Available";
      case "S": return "Selected";
      case "B": return "Blocked";
      case "R": return "Reserved";
      case "E": return "Entry/Exit";
      case "X": return "Not Available";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-2">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-4xl px-2 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Parking Lot Layout
          </span>
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading parking layout...</p>
          </div>
        ) : parkingData.grid.length === 0 ? (
          <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-xl text-center">
            <p className="text-gray-300">No parking lot data available</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-gray-900/60 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-gray-800 shadow-xl mb-4">
              <div className="flex flex-wrap justify-center gap-2 mb-3 text-center">
                {["P", "S", "B", "R", "E", "X"].map((code) => (
                  <div key={code} className="flex items-center space-x-1">
                    <div className={`w-3 h-3 ${getSlotColor(code).bg} rounded`}></div>
                    <span className="text-xs text-gray-300">{getLegendLabel(code)}</span>
                  </div>
                ))}
              </div>
              
              <div className="overflow-auto p-1 w-full">
                <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/40 p-1 inline-block">
                  {parkingData.grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {Array.isArray(row) &&
                        row.map((cell, colIndex) => {
                          const slotStyle = getSlotColor(cell);
                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className={`w-6 h-6 sm:w-7 sm:h-7 m-0.5 flex items-center justify-center border border-gray-700 rounded transition-colors ${slotStyle.bg} ${slotStyle.hover} ${slotStyle.cursor}`}
                              onClick={() => handleSlotClick(rowIndex, colIndex)}
                            >
                              <span className="text-xs font-medium scale-75">
                                {parkingData.slotLabels?.[rowIndex]?.[colIndex] || ""}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-gray-400 text-xs">
                Click on an available slot to select it for booking
              </p>
              {selectedSlot && (
                <p className="text-gray-300 mt-2 text-sm">
                  Currently selected: <span className="font-semibold text-purple-300">{selectedSlot.label}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmationOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full mx-auto p-6 animate-slideUp">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Confirm Booking</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to book parking slot <span className="font-semibold text-purple-300">{selectedSlot?.label}</span>?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={cancelSelection}
                disabled={isUpdating}
                className="order-2 sm:order-1 px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={
                  () => {
                    // Handle booking confirmation logic here
                    BookingDetails.rowIndex=selectedSlot.rowIndex
                    BookingDetails.colIndex=selectedSlot.colIndex
                    BookingDetails.slot=selectedSlot.label
                    BookingDetails.Date= getCurrentDate("-")
                    BookingDetails.Time= new Date().toLocaleTimeString()
                    navigate("/Detail-Filling")
                  }
                }
                disabled={isUpdating}
                className="order-1 sm:order-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-70 flex items-center justify-center"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingLot;