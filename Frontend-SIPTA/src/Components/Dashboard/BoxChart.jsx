import React, { useEffect, useState } from "react";
import { TEChart } from "tw-elements-react";

const BoxChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Traffic",
        data: [],
        backgroundColor: ["#9EDE73", "#6499E9", "#F0134D", "#FFCD56"],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/input-barang");
        const data = await response.json();

        const labels = [
          "Barang Masuk",
          "Barang Keluar",
          "Barang Rusak",
          "Barang Pinjaman",
        ];
        const datasetData = [
          data.filter((item) => item.kategori_input === "Barang Masuk").length,
          data.filter((item) => item.kategori_input === "Barang Keluar").length,
          data.filter((item) => item.kategori_input === "Barang Rusak").length,
          data.filter((item) => item.kategori_input === "Barang Pinjaman")
            .length,
        ];

        setChartData({
          labels,
          datasets: [
            {
              label: "Traffic",
              data: datasetData,
              backgroundColor: ["#9EDE73", "#6499E9", "#F0134D", "#FFCD56"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full h-full p-4 rounded-3xl shadow-md">
      <div className="w-full h-full">
        <h2 className="text-lg font-semibold">Grafik Perbandingan Barang</h2>
        <div className="w-full flex items-center justify-center ">
          <div className="p-2 w-[80%]">
            <TEChart type="pie" data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxChart;
