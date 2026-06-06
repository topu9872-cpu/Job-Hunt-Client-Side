"use client";

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const fullData = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const options = {
  title: "My Daily Activities",
  backgroundColor: "transparent",
  is3D: true,
  pieSliceText: "percentage",
  legend: {
    textStyle: { color: "#a1a1aa" },
  },
  titleTextStyle: {
    color: "#ffffff",
    fontSize: 20,
  },
  chartArea: {
    width: "90%",
    height: "80%",
  },
  colors: ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444"],
};

const DashboardChart = () => {
  const [data, setData] = useState([["Task", "Hours per Day"]]);

  useEffect(() => {
    let i = 1;

    const interval = setInterval(() => {
      if (i < fullData.length) {
        setData((prev) => [...prev, fullData[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">

    

        {/* Header */}
        <div className="mb-6">
          <h2 className=" text-2xl font-bold">
            Analytics Overview
          </h2>
          <p className="text-sm text-zinc-400">
            Live step-by-step data loading chart
          </p>
        </div>

      {/* WIDE CHART WRAPPER */}
<div className="w-full "> 
  <Chart
    chartType="PieChart"
    width="100%"
    height="100%"
    data={data}
    options={options}
  />
</div>
     
    </div>
  );
};

export default DashboardChart;