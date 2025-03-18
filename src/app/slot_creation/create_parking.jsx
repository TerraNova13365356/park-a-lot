"use client";
import { ref, set } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";  
import React, { useState, useEffect } from "react";

const cellTypes = {
  P: { label: "Parking", color: "bg-green-500" },
  R: { label: "Road", color: "bg-gray-300" },
  E: { label: "Entrance", color: "bg-blue-500" },
  X: { label: "Exit", color: "bg-red-500" },
  B: { label: "Border", color: "bg-black" },
};

const numRows = 30;
const numCols = 30;

// Sample data for states and districts
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const districts = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Dibrugarh", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
  "Goa": ["Panaji", "Margao"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Gurgaon", "Faridabad", "Rohtak"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Manipur": ["Imphal", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Puri"],
  "Punjab": ["Amritsar", "Ludhiana", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"]
};


function CreateParkingLayout() {
  const [grid, setGrid] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill("R"))
  );
  const [slotLabels, setSlotLabels] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill(""))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [selectedType, setSelectedType] = useState("P");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    assignSlotLabels();
  }, [grid]);

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDragging(true);
    updateCell(rowIndex, colIndex);
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (isDragging) {
      getSelection().removeAllRanges();
      updateCell(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const updateCell = (rowIndex, colIndex) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? selectedType : cell))
          : row
      )
    );
  };

  const assignSlotLabels = () => {
    let labelCounter = {};
    let currentLabel = "A";
    let visited = new Set();

    const newLabels = grid.map((row) => row.map(() => ""));

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (grid[r][c] === "P" && !visited.has(`${r}-${c}`)) {
          labelCounter[currentLabel] = labelCounter[currentLabel] || 1;
          floodFill(r, c, currentLabel, labelCounter[currentLabel], newLabels, visited);
          labelCounter[currentLabel]++;
          currentLabel = String.fromCharCode(currentLabel.charCodeAt(0) + 1);
        }
      }
    }
    setSlotLabels(newLabels);
  };

  const floodFill = (r, c, label, count, newLabels, visited) => {
    if (r < 0 || r >= numRows || c < 0 || c >= numCols || grid[r][c] !== "P" || visited.has(`${r}-${c}`)) {
      return;
    }
    visited.add(`${r}-${c}`);
    newLabels[r][c] = `${label}${count++}`;
    floodFill(r + 1, c, label, count, newLabels, visited);
    floodFill(r - 1, c, label, count, newLabels, visited);
    floodFill(r, c + 1, label, count, newLabels, visited);
    floodFill(r, c - 1, label, count, newLabels, visited);
  };

  const handleSaveLayout = () => {
    const layoutData = {
      state,
      district,
      destination,
      operator:"",
      parkingLayout: {
        numRows,
        numCols,
        grid,
        slotLabels,
      },
    };

    set(ref(db, `Parking/${state}/${district}/${destination}/parkingLayout`), layoutData)
      .then(() => {
        set(ref(db, `Destinations/${state}/${district}/${destination}`),"")
      .then(() => alert("Parking layout saved!"))
      .catch((error) => console.error("Error saving layout:", error));
      })
      .catch((error) => console.error("Error saving layout:", error));

  };

  return (
    <div className="flex flex-col items-center p-5 overflow-x-auto" onMouseUp={handleMouseUp}>
      <div className="flex gap-3 mb-4 p-3 border bg-white shadow-md rounded">
        {Object.entries(cellTypes).map(([key, { label, color }]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded ${color} text-white ${selectedType === key ? "border-4 border-black" : ""}`}
            onClick={() => setSelectedType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md mb-4">
        {/* State Dropdown */}
        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setDistrict(""); // Reset district when state changes
          }}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* District Dropdown */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          disabled={!state} // Disable if no state is selected
        >
          <option value="">Select District</option>
          {state &&
            districts[state].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>

        {/* Destination Input */}
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
      </div>

      <div className="overflow-auto border shadow-lg" style={{ maxWidth: "90vw", maxHeight: "80vh" }}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-5 h-5 flex items-center justify-center border cursor-pointer text-white text-xs ${cellTypes[cell].color}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
              >
                {slotLabels[rowIndex][colIndex]}
              </div>
            ))
          )}
        </div>
      </div>

      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" onClick={handleSaveLayout}>
        Save Layout
      </button>
    </div>
  );
}

export default CreateParkingLayout;