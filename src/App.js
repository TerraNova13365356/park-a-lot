import React from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Confirmation from "./app/confirmation/confirmation";
import HomePage from "./app/Home/home";
import ParkingLot from "./app/Booking/SlotBook";
import AuthPage from "./app/authPage/authPage";
import Dashboard from "./app/views/user/userView";
import BookingHistory from "./app/history/history";
import PaymentPage from "./app/payment/payment";
import SelectLocation from "./app/location-selection/location";
import CreateParkingLayout from "./app/slot_creation/create_parking";
import BookingConfirmationPage from "./app/Detail-Filling/Detail-fill";
import QRCodeScanner from "./app/qrScanner/scanner";
import CheckIn from "./app/CheckIn/CheckIn";
import ScanPage from "./app/nextScan/nextScan";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/SlotBooking" element={<ParkingLot/>} />
        <Route path="/Confirmatiom" element={<Confirmation />} />
        <Route path="/AuthPage" element={<AuthPage/>} />
        <Route path="/Location-Selection" element={<SelectLocation/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/History" element={<BookingHistory/>} />
        <Route path="/Payment" element={<PaymentPage/>} />
        <Route path="/Confirmation" element={<Confirmation/>} />
        <Route path="/CreateParking" element={<CreateParkingLayout/>} />
        <Route path="/Detail-Filling" element={<BookingConfirmationPage/>} />
        <Route path="/Qr-Code" element={<QRCodeScanner/>} />
        <Route path="/CheckIn" element={<CheckIn/>} />
        <Route path="/ScanPage" element={<ScanPage/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
