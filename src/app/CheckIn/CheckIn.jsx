import { useEffect, useState } from "react";
import { db, ref, get, update ,set} from "../../firebase/firebaseConfig";
import { ScanDetails } from "../onj";

const CheckIn = () => {
  const [checkInData, setCheckInData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const operatorRef = ref(db, `Operator/${ScanDetails.ScanId}`);
  const [data,setdata]= useState(null)
  useEffect(() => {
    const fetchCheckInData = async () => {
      try {
        const snapshot = await get(operatorRef);
        if (snapshot.exists()) {
          setCheckInData(snapshot.val());
        } else {
          setCheckInData(null);
        }
      } catch (error) {
        console.error("Error fetching check-in data:", error);
      }
      setLoading(false);
    };

    fetchCheckInData();
  }, []);

  const handleCheckIn = async () => {
    if (checkingIn || !checkInData) return;
    setCheckingIn(true);
    
    const currentTime = new Date().toISOString();
    let updatedData = { ...checkInData };

    if (!checkInData.CheckIn) {
      updatedData.CheckIn = currentTime;

    } else if (checkInData.CheckIn && !checkInData.CheckOut) {
    
      updatedData.CheckOut = currentTime;
      const checkInTime = new Date(checkInData.CheckIn);
      const checkOutTime = new Date(currentTime);
      const duration = (checkOutTime - checkInTime) / (1000 * 60 * 60); // in hours
      updatedData.Price = (duration * 50).toFixed(2); // Example: ₹50 per hour
      let data1={}
      try {
        const snapshot = await get(ref(db,`Operator/optId123`));
        if (snapshot.exists()) {
            console.log(snapshot.val())
          data1=snapshot.val();
        } else {
          data1(null);
        }
      } catch (error) {
        console.error("Error fetching check-in data:", error);
      }
      console.log(checkInData.col)
      const slotRef = ref(db, `Parking/${data1.state}/${data1.district}/${data1.destination}/parkingLayout/parkingLayout/grid/${checkInData.row}/${checkInData.col}`);
      
      await set(slotRef, "P");
      console.log("dfjhjbfhj");
    }

    try {
      await update(operatorRef, updatedData);
      setCheckInData(updatedData);
        window.location.replace("/ScanPage")
    } catch (error) {
      console.error("Error updating check-in data:", error);
    }
    setCheckingIn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Check-In Data</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : checkInData ? (
        <div className="w-3/4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4 p-4 border-b border-gray-700">
            <p><strong>Booked Time:</strong> {checkInData.BookedTime}</p>
            <p><strong>Vehicle:</strong> {checkInData.Vehicle}</p>
            <p><strong>Check-In:</strong> {checkInData.CheckIn || "Not Checked In"}</p>
            <p><strong>Check-Out:</strong> {checkInData.CheckOut || "Not Checked Out"}</p>
            <p><strong>Price:</strong> {checkInData.Price || "N/A"}</p>
            <p><strong>Row:</strong> {checkInData.row}</p>
            <p><strong>Column:</strong> {checkInData.col}</p>
          </div>
          <button 
            onClick={handleCheckIn} 
            disabled={checkingIn} 
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow">
            {checkInData.CheckIn && !checkInData.CheckOut ? "Check Out" : "Check In"}
          </button>
        </div>
      ) : (
        <p className="text-red-400">No check-in data available.</p>
      )}
    </div>
  );
};

export default CheckIn;
