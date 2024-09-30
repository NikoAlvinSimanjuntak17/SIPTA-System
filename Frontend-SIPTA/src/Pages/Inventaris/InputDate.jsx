import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const InputDate = ({ onDateChange, selectedDate }) => {
  const [localDate, setLocalDate] = useState(selectedDate || new Date());

  useEffect(() => {
    // Set tanggal saat ini jika belum diset
    if (!selectedDate) {
      const today = new Date();
      setLocalDate(today);
      if (onDateChange) {
        const formattedDate = format(today, "yyyy-MM-dd");
        onDateChange(formattedDate);
      }
    } else {
      setLocalDate(selectedDate);
    }
  }, [selectedDate, onDateChange]);

  const handleChange = (date) => {
    setLocalDate(date);
    if (onDateChange) {
      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
      onDateChange(formattedDate);
    }
  };

  const placeholderText = localDate
    ? format(localDate, "MM/dd/yyyy")
    : "Pilih Tanggal";

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Tanggal</h2>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <DatePicker
          selected={localDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 poppins-regular text-sm text-center"
          placeholderText={placeholderText}
          readOnly
          style={{ width: "100%", height: "2.5rem" }}
        />
      </div>
    </div>
  );
};

export default InputDate;
