'use client'
import React, { useState } from 'react';
import axios from 'axios';

function ParkingPrediction() {
  const [inputData, setInputData] = useState([]);  // Assume you have the input data
  const [predictions, setPredictions] = useState(null);
  const [bestSlot, setBestSlot] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        input: [
            [1, 50, 1, 0],   // Slot 1: size=1, distance=50m, near shade, not occupied
            [2, 100, 0, 1],  // Slot 2: size=2, distance=100m, not near shade, occupied
            [1, 80, 1, 0],   // Slot 3: size=1, distance=80m, near shade, not occupied
            [3, 20, 0, 1],   // Slot 4: size=3, distance=20m, not near shade, occupied
            [1, 60, 1, 0]    // Slot 5: size=1, distance=60m, near shade, not occupied
          ]
      });
      setPredictions(response.data.predictions);
      setBestSlot(response.data.best_slot);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  return (
    <div>
      <h1>Parking Slot Prediction</h1>
      <button onClick={handlePredict}>Get Prediction</button>
      {predictions && (
        <div>
          <h2>Predictions:</h2>
          <pre>{JSON.stringify(predictions, null, 2)}</pre>
        </div>
      )}
      {bestSlot && (
        <div>
          <h2>Best Slot:</h2>
          <p>The most suitable parking slot is Slot {bestSlot}.</p>
        </div>
      )}
    </div>
  );
}

export default ParkingPrediction;
