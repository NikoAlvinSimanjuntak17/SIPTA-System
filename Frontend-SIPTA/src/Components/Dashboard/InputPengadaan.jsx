import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreatePengadaan from "../../Pages/Procurement/CreatePengadaan";

const InputPengadaan = ({ value, onProcurementChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProcurement, setSelectedProcurement] = useState(
    value || "Pilih Jenis Pengadaan"
  );
  const [procurements, setProcurements] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false); // State for CreatePengadaan modal

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch procurements when the component mounts
    axios
      .get("/procurements")
      .then((response) => {
        setProcurements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching procurements:", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (procurement) => {
    setSelectedProcurement(procurement.procurement_name);
    setIsOpen(false);
    if (onProcurementChange) {
      onProcurementChange(procurement.id); // Pass the ID to the parent component
    }
  };

  const handleAddProcurement = () => {
    setIsCreateOpen(true); // Open modal when add icon is clicked
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false); // Close CreatePengadaan modal
    // Refetch procurements after adding a new one
    axios
      .get("/procurements")
      .then((response) => {
        setProcurements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching procurements:", error);
      });
  };

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3" ref={dropdownRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Jenis Pengadaan</h2>
        {/* Add icon */}
        <button
          type="button"
          onClick={handleAddProcurement}
          className="text-black-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <div className="w-full">
          <button
            name="tipe_barang"
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs poppins-regular text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {selectedProcurement}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="origin-top-right absolute left-0 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1 w-full" role="none">
              {procurements.length > 0 ? (
                procurements.map((procurement) => (
                  <button
                    key={procurement.id}
                    onClick={() => handleSelect(procurement)}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    {procurement.procurement_name}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 px-4 py-2">No procurements available</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal for CreatePengadaan */}
      <CreatePengadaan isOpen={isCreateOpen} onClose={closeCreateModal} />
    </div>
  );
};

export default InputPengadaan;
