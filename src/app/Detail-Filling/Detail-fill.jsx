import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingDetails } from "../onj";
import { push, ref, set } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";

const BookingConfirmationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    vehicleNo: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.vehicleNo.trim())
      newErrors.vehicleNo = "Vehicle number is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    BookingDetails.name = formData.fullName;
    BookingDetails.vehicle = formData.vehicleNo;
    BookingDetails.contact = formData.phone;
    try {
        const slotRef = ref(
            db,
            `Parking/${BookingDetails.State}/${BookingDetails.District}/${BookingDetails.Destination}/parkingLayout/parkingLayout/grid/${BookingDetails.rowIndex}/${BookingDetails.colIndex}`
          );
          await set(slotRef, "X");
          
          let bookref = ref(
            db,
            `BookDetails/${BookingDetails.State}/${BookingDetails.District}/${BookingDetails.Destination}/${BookingDetails.vehicle}`
          );
          
          let bookPushRef = push(bookref);
          await set(bookPushRef, {
            Booked_time: BookingDetails.Time,
            CheckIn: "",
            CheckOut: "",
            Price: 0,
            Date: BookingDetails.Date,
          });
          
          // Get the generated booking ID
          let book_id = bookPushRef.key;
          BookingDetails.booking_id = book_id;
          console.log(book_id);
          
          let opt_ref = ref(db, `Operator/${book_id}`);
          await set(opt_ref, {
            Vehicle: BookingDetails.vehicle,
            BookedTime: BookingDetails.Time,
            CheckIn: "",
            CheckOut: "",
            Price: 0,
            row: BookingDetails.rowIndex,
            col: BookingDetails.colIndex,
          });
          
    } catch (error) {
        alert("Something Went Wrong Try Again!")
    }
    navigate("/Confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-100">
              Confirm Your Booking
            </h1>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {isSuccess ? (
            <div className="bg-gray-700 border border-green-400 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-green-400">
                  Booking confirmed successfully!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    className={`mt-1 block w-full bg-gray-700 border ${
                      errors.fullName ? "border-red-500" : "border-gray-600"
                    } rounded-md shadow-sm py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="vehicleNo"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    id="vehicleNo"
                    name="vehicleNo"
                    placeholder="Enter your vehicle number"
                    className={`mt-1 block w-full bg-gray-700 border ${
                      errors.vehicleNo ? "border-red-500" : "border-gray-600"
                    } rounded-md shadow-sm py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    value={formData.vehicleNo}
                    onChange={handleChange}
                  />
                  {errors.vehicleNo && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.vehicleNo}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    className={`mt-1 block w-full bg-gray-700 border ${
                      errors.phone ? "border-red-500" : "border-gray-600"
                    } rounded-md shadow-sm py-3 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-gray-900 px-8 py-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            By confirming your booking, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
