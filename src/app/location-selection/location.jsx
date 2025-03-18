 
import { useState, useEffect } from 'react';
import { BookingDetails } from '../onj';
import { useNavigate } from 'react-router-dom';
import { ref, set ,onValue, get} from "firebase/database";
import { db } from "../../firebase/firebaseConfig"; 

const SelectLocation = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  let navigate=useNavigate()
  // States and districts data (simplified for example)
  const states = [
    { id: "Andhra Pradesh", name: "Andhra Pradesh" },
    { id: "Arunachal Pradesh", name: "Arunachal Pradesh" },
    { id: "Assam", name: "Assam" },
    { id: "Bihar", name: "Bihar" },
    { id: "Chhattisgarh", name: "Chhattisgarh" },
    { id: "Goa", name: "Goa" },
    { id: "Gujarat", name: "Gujarat" },
    { id: "Haryana", name: "Haryana" },
    { id: "Himachal Pradesh", name: "Himachal Pradesh" },
    { id: "Jharkhand", name: "Jharkhand" },
    { id: "Karnataka", name: "Karnataka" },
    { id: "Kerala", name: "Kerala" },
    { id: "Madhya Pradesh", name: "Madhya Pradesh" },
    { id: "Maharashtra", name: "Maharashtra" },
    { id: "Manipur", name: "Manipur" },
    { id: "Meghalaya", name: "Meghalaya" },
    { id: "Mizoram", name: "Mizoram" },
    { id: "Nagaland", name: "Nagaland" },
    { id: "Odisha", name: "Odisha" },
    { id: "Punjab", name: "Punjab" },
    { id: "Rajasthan", name: "Rajasthan" },
    { id: "Sikkim", name: "Sikkim" },
    { id: "Tamil Nadu", name: "Tamil Nadu" },
    { id: "Telangana", name: "Telangana" },
    { id: "Tripura", name: "Tripura" },
    { id: "Uttar Pradesh", name: "Uttar Pradesh" },
    { id: "Uttarakhand", name: "Uttarakhand" },
    { id: "West Bengal", name: "West Bengal" }
];

  
const districts = {
  "Andhra Pradesh": [
      { id: "Visakhapatnam", name: "Visakhapatnam" },
      { id: "Vijayawada", name: "Vijayawada" },
      { id: "Guntur", name: "Guntur" },
      { id: "Nellore", name: "Nellore" },
      { id: "Tirupati", name: "Tirupati" }
  ],
  "Arunachal Pradesh": [
      { id: "Itanagar", name: "Itanagar" },
      { id: "Tawang", name: "Tawang" },
      { id: "Ziro", name: "Ziro" },
      { id: "Pasighat", name: "Pasighat" },
      { id: "Bomdila", name: "Bomdila" }
  ],
  "Assam": [
      { id: "Guwahati", name: "Guwahati" },
      { id: "Dibrugarh", name: "Dibrugarh" },
      { id: "Tezpur", name: "Tezpur" },
      { id: "Silchar", name: "Silchar" },
      { id: "Jorhat", name: "Jorhat" }
  ],
  "Bihar": [
      { id: "Patna", name: "Patna" },
      { id: "Gaya", name: "Gaya" },
      { id: "Bhagalpur", name: "Bhagalpur" },
      { id: "Muzaffarpur", name: "Muzaffarpur" },
      { id: "Darbhanga", name: "Darbhanga" }
  ],
  "Karnataka": [
      { id: "Bangalore", name: "Bangalore" },
      { id: "Mysore", name: "Mysore" },
      { id: "Mangalore", name: "Mangalore" },
      { id: "Hubli", name: "Hubli" },
      { id: "Belgaum", name: "Belgaum" }
  ],
  "Kerala": [
      { id: "Thiruvananthapuram", name: "Thiruvananthapuram" },
      { id: "Kochi", name: "Kochi" },
      { id: "Kozhikode", name: "Kozhikode" },
      { id: "Thrissur", name: "Thrissur" },
      { id: "Kottayam", name: "Kottayam" }
  ],
  "Maharashtra": [
      { id: "Mumbai", name: "Mumbai" },
      { id: "Pune", name: "Pune" },
      { id: "Nagpur", name: "Nagpur" },
      { id: "Nashik", name: "Nashik" },
      { id: "Aurangabad", name: "Aurangabad" }
  ],
  "Uttar Pradesh": [
      { id: "Lucknow", name: "Lucknow" },
      { id: "Kanpur", name: "Kanpur" },
      { id: "Varanasi", name: "Varanasi" },
      { id: "Agra", name: "Agra" },
      { id: "Prayagraj", name: "Prayagraj" }
  ]
};

  
  // Popular places for shopping malls, theatres, airports, etc.
  const [districtDestinations, setDistrictDestinations] = useState({})
  const [district, setDistrict] = useState({})
  // const districtDestinations = {
  //   mumbai: [
  //     'Phoenix Marketcity Mall',
  //     'High Street Phoenix',
  //     'PVR Cinemas',
  //     'Chhatrapati Shivaji Maharaj International Airport',
  //     'Carter Road',
  //   ],
  //   pune: [
  //     'Phoenix Marketcity',
  //     'Osho Teerth Park',
  //     'E-Square Cinemas',
  //     'Pune Railway Station',
  //     'Pune International Airport',
  //   ],
  //   lucknow: [
  //     'Phoenix Palassio Mall',
  //     'Wave Mall',
  //     'PVR Cinemas',
  //     'Chaudhary Charan Singh International Airport',
  //     'Hazratganj Market',
  //   ],
  //   agra: [
  //     'Savior Mall',
  //     'TDI Mall',
  //     'Cinemax Agra',
  //     'Agra Cantt Railway Station',
  //     'Agra Airport',
  //   ],
  //   bangalore: [
  //     'UB City Mall',
  //     'Forum Mall',
  //     'PVR Cinemas',
  //     'Kempegowda International Airport',
  //     'MG Road',
  //   ],
  //   mysore: [
  //     'Mall of Mysore',
  //     'Inox Cinemas',
  //     'Mysore Palace Road',
  //     'Mysore Airport',
  //   ],
  //   kochi: [
  //     'Lulu Mall',
  //     'Cochin International Airport',
  //     'PVR Cinemas',
  //     'Marine Drive',
  //     'Cochin Shipyard',
  //   ],
  //   thiruvananthapuram: [
  //     'Lulu Mall Trivandrum',
  //     'PVR Cinemas',
  //     'Trivandrum International Airport',
  //     'Sree Chitra Art Gallery',
  //     'Kovalam Beach',
  //   ],
  // };
  
  function capitalizeFirstLetter(str) {
    if (!str) return str; // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isSuggestionsOpen && !e.target.closest('.suggestions-container')) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isSuggestionsOpen]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    console.log(event.target.value);
    setSelectedDistrict(''); // Reset district when state changes
    setDestinationName('');
    setFilteredDestinations([]);
  };

  let Dest=[]

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(capitalizeFirstLetter(districtId));
    console.log(districtId);

    const destinationsRef = ref(db, `Destinations/${selectedState}/${districtId}`);

    onValue(destinationsRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const districtArray = Object.entries(data).map(([key, value]) => ({
                state: key, // Using the key directly instead of key[0]
                ...value    // Spreading additional properties inside `value`
            }));

            districtArray.forEach((a, index) => {
              Dest.push(a["state"])
            });
            setDistrict(Dest)
        } else {
            console.log("No data available");
        }
    });

    setDestinationName('');
    setFilteredDestinations([]);
};



  const handleDestinationChange = (event) => {
    const value = event.target.value;
    setDestinationName(capitalizeFirstLetter(value));
    BookingDetails.Destination=value
    // Filter destinations based on the selected district and input value
    if (selectedDistrict && value) {
      const filtered = district.filter((destination) =>
        destination.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setIsSuggestionsOpen(filtered.length > 0);
    } else {
      setFilteredDestinations([]);
      setIsSuggestionsOpen(false);
    }
  };

  const handleSelectSuggestion = (destination) => {
    setDestinationName(destination);
    setIsSuggestionsOpen(false);
  };

  const handleSubmit = () => {
    if (selectedState && selectedDistrict && destinationName) {
      const stateName = states.find(state => state.id === selectedState)?.name;
      const districtName = districts[selectedState]?.find(district => district.id === selectedDistrict)?.name;
      BookingDetails.Destination=destinationName
      BookingDetails.State=stateName
      BookingDetails.District=districtName
      navigate("/SlotBooking")
    } else {
      alert('Please select all fields and enter a destination name.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100 py-10 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-10">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Select Your Location
          </span>
        </h1>

        <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-xl">
          {/* State Dropdown */}
          <div className="mb-6">
            <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
              Choose a State
            </label>
            <div className="relative">
              <select
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none"
              >
                <option value="">--Select a State--</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* District Dropdown */}
          <div className={`mb-6 transition-opacity duration-300 ${selectedState ? 'opacity-100' : 'opacity-0'}`}>
            <label htmlFor="district" className="block text-sm font-medium text-gray-300 mb-2">
              Choose a District
            </label>
            <div className="relative">
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedState}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none disabled:opacity-50"
              >
                <option value="">--Select a District--</option>
                {districts[selectedState]?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Destination Name Input with Suggestions */}
          <div className={`mb-6 transition-opacity duration-300 ${selectedDistrict ? 'opacity-100' : 'opacity-0'}`}>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-300 mb-2">
              Enter Destination Name
            </label>
            <div className="suggestions-container relative">
              <div className="relative">
                <input
                  type="text"
                  id="destination"
                  value={destinationName}
                  onChange={handleDestinationChange}
                  disabled={!selectedDistrict}
                  className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                  placeholder="e.g., Central Park"
                  onFocus={() => setIsSuggestionsOpen(filteredDestinations.length > 0)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Display suggestions */}
              {isSuggestionsOpen && (
                <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md bg-gray-800 border border-gray-700 shadow-lg">
                  {filteredDestinations.map((destination, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-gray-300 cursor-pointer hover:bg-purple-900/50 transition duration-150"
                      onClick={() => handleSelectSuggestion(destination)}
                    >
                      {destination}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedState || !selectedDistrict || !destinationName}
            className="w-full py-3 px-6 mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            Find Parking Slots
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;