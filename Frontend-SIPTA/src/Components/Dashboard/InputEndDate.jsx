import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

const InputEndDate = ({ onDateChange, selectedDate }) => {
  const [localDate, setLocalDate] = useState(selectedDate || null);

  useEffect(() => {
    // Convert ISO string to Date object if necessary
    if (typeof selectedDate === "string") {
      setLocalDate(selectedDate ? parseISO(selectedDate) : null);
    } else {
      setLocalDate(selectedDate);
    }
  }, [selectedDate]);

  const handleChange = (date) => {
    setLocalDate(date);
    if (onDateChange) {
      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
      onDateChange(formattedDate);
    }
  };

  // Format placeholder sesuai dengan format yang diinginkan
  const placeholderText = localDate
    ? format(localDate, "MM/dd/yyyy") // Format tanggal sesuai kebutuhan
    : "Masukkan Tanggal";

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Tanggal Akhir Peminjaman</h2>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <DatePicker
          selected={localDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular text-sm text-center"
          placeholderText={placeholderText}
          style={{ width: "100%", height: "2.5rem" }} // Adjust width and height of the DatePicker input
        />
      </div>
    </div>
  );
};

export default InputEndDate;
