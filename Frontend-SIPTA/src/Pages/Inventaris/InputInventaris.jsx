import React, { useState, useEffect } from "react"; 
import NavbarDashboard from "../../Components/NavbarDashboard";
import SidebarDashboard from "../../Components/SidebarDashboard";
import InputCategory from "../../Components/Dashboard/InputCategory";
import InputSubCategory from "../../Components/Dashboard/InputSubCategory";
import InputName from "../../../src/Pages/Inventaris/InputName";
import InputQuality from "../../../src/Pages/Inventaris/InputQuality";
import InputJumlah from "../../../src/Pages/Inventaris/InputQuantity";
import InputSerialNumber from "../../../src/Pages/Inventaris/InputSerialNumber";
import InputItemImage from "../../../src/Pages/Inventaris/InputPicture";
import InputSatuan from "../../../src/Pages/Inventaris/InputSatuan";
import InputWorkUnit from "../../../src/Pages/Inventaris/InputWorkUnit";
import InputLocation from "../../../src/Pages/Inventaris/InputLocation";
import { ToastContainer, toast } from "react-toastify";
import InputPengadaan from "../../Components/Dashboard/InputPengadaan";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const InputInventaris = () => {
  const [procurements, setProcurements] = useState([]);
  const [selectedProcurement, setSelectedProcurement] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  const [data, setData] = useState({
    item_name: "",
    quality: "Choose Item Condition",
    quantity: "",
    serial_number: "",
    item_image: null,
    unit: "",
    work_unit: "",
    location: "",
    procurement_id: "", // Add procurement_id to track the selected procurement
    subcategory_id: "", // Add subcategory_id to track selected subcategory
    category_id: "", // Add category_id to track selected category
    status: "available", // Set default status to "available"
  });

  // Handle changes for text input fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleProcurementChange = async (procurementId) => {
    setSelectedProcurement(procurementId);
    setData((prevData) => ({
      ...prevData,
      procurement_id: procurementId, // Update the state with the selected procurement ID
    }));
    try {
      const response = await fetchCategoriesByProcurement(procurementId);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setData((prevData) => ({
      ...prevData,
      category_id: categoryId, // Update the state with the selected category ID
    }));
    try {
      const response = await fetchSubCategoriesByCategory(categoryId);
      setSubCategories(response.data);
      // Reset subcategory selection when category changes
      setSelectedSubCategory("");
      setData((prevData) => ({
        ...prevData,
        subcategory_id: "", // Reset subcategory_id when category changes
      }));
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  const handleSubCategoryChange = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
    setData((prevData) => ({
      ...prevData,
      subcategory_id: subcategoryId, // Update state with selected subcategory ID
    }));
  };

  const handleSave = async () => {
    try {
      // Get the current logged-in user ID from localStorage
      const loggedInUserId = localStorage.getItem('user_id'); // Assuming user ID is stored in localStorage

      // Ensure the user ID is set before sending the data
      if (!loggedInUserId) {
        toast.error("User is not logged in. Please log in first.");
        return;
      }

      const formData = new FormData();
      formData.append("item_name", data.item_name);
      formData.append("quality", data.quality);
      formData.append("quantity", data.quantity);
      formData.append("serial_number", data.serial_number);
      formData.append("unit", data.unit);
      formData.append("work_unit", data.work_unit);
      formData.append("location", data.location);
      formData.append("created_by_user_id", loggedInUserId); // Automatically set the user ID
      formData.append("procurement_id", data.procurement_id); // Append procurement_id to formData
      formData.append("subcategory_id", data.subcategory_id); // Append subcategory_id to formData
      formData.append("category_id", data.category_id); // Append category_id to formData
      formData.append("status", data.status); // Append status to formData
      if (data.item_image) {
        formData.append("item_image", data.item_image); // Ensure this is still a file object
      }

      // Use Axios to post the data
      const response = await axios.post("/inventory-items", formData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Inventory data saved successfully!");
        setData({
          item_name: "",
          quality: "Choose Item Condition",
          quantity: "",
          serial_number: "",
          item_image: null,
          unit: "",
          work_unit: "",
          location: "",
          procurement_id: "", // Reset procurement_id
          subcategory_id: "", // Reset subcategory_id
          category_id: "", // Reset category_id
          status: "available", // Reset status to "available"
        });
        setSelectedCategory(""); // Reset selected category
        setSelectedSubCategory(""); // Reset selected subcategory
        setCategories([]); // Clear categories
        setSubCategories([]); // Clear subcategories
      } else {
        console.error("Error saving data:", response.data);
        toast.error("Error saving data!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error occurred!");
    }
  };

  return (
    <div className="w-screen flex flex-col bg-white" data-aos="fade-up">
      <ToastContainer />
      <div className="fixed top-0 right-0 z-10 w-[85%]">
        <NavbarDashboard />
      </div>
      <div className="flex overflow-y-hidden">
        <div className="absolute right-0 w-[85%]">
          <div className="h-screen">
            <div id="DashboardContent" className="flex flex-row">
              <div className="flex flex-col bg-gray-100 w-full h-screen pt-20 px-4">
                <p className="font-sm text-gray-600 mt-3 mb-3">
                  Masukkan Jenis Pengadaan Terlebih Dahulu
                </p>
                <div id="LeftBoxParent" className="flex flex-row w-[100%] space-x-6 mt-2">
                  <div className="w-[33%]">
                    <InputPengadaan onProcurementChange={handleProcurementChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputCategory procurementId={selectedProcurement} onCategoryChange={handleCategoryChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputSubCategory categoryId={selectedCategory} onSubCategoryChange={handleSubCategoryChange} />
                  </div>
                </div>
                <div className="flex flex-row w-[100%] space-x-6 mt-4">
                  <div className="w-[33%]">
                    <InputName value={data.item_name} onChange={handleChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputQuality value={data.quality} onChange={handleChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputJumlah value={data.quantity} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex flex-row w-[100%] space-x-6 mt-4">
                  <div className="w-[33%]">
                    <InputSerialNumber value={data.serial_number} onChange={handleChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputItemImage onChange={handleChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputSatuan value={data.unit} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex flex-row w-[100%] space-x-6 mt-4">
                  <div className="w-[33%]">
                    <InputWorkUnit value={data.work_unit} onChange={handleChange} />
                  </div>
                  <div className="w-[33%]">
                    <InputLocation value={data.location} onChange={handleChange} />
                  </div>
                </div>
                <div className="w-full mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Simpan Inventaris
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed w-[15%] bg-white">
          <SidebarDashboard />
        </div>
      </div>
    </div>
  );
};

export default InputInventaris;
