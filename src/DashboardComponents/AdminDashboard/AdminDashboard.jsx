"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";


const AdminDashboard = ({ totalUsers, totalJobs, getTotalApply, getSub }) => {
  const searchParams = useSearchParams();
  const currentTimeline = searchParams.get("timeline") || "month";

  // Triggers for orchestration
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    // Small timeout ensures the browser registers the initial 0 state before animating
    const timer = setTimeout(() => setAnimateCharts(true), 50);
    return () => clearTimeout(timer);
  }, [currentTimeline]); 

  // 📊 Dynamic Revenue Data Aggregation from getSub prop
  const revenueData = React.useMemo(() => {
    if (!getSub || !Array.isArray(getSub)) return [];

    if (currentTimeline === "today") {
      // Initialize 2D hourly bins matching your existing timeline naming keys
      const hourlyBins = {
        "10AM": 0,
        "12PM": 0,
        "2PM": 0,
        "4PM": 0,
        "6PM": 0,
      };

      getSub.forEach((item) => {
        const price = Number((item?.price || "$0").replace("$", "")) || 0;
        const dateStr = item?.createdAt || item?.date;
        if (!dateStr) return;

        const date = new Date(dateStr);
        const hours = date.getHours();

        // Assign to the nearest custom UI intervals safely matching original schema
        if (hours < 11) hourlyBins["10AM"] += price;
        else if (hours < 13) hourlyBins["12PM"] += price;
        else if (hours < 15) hourlyBins["2PM"] += price;
        else if (hours < 17) hourlyBins["4PM"] += price;
        else hourlyBins["6PM"] += price;
      });

      return Object.entries(hourlyBins).map(([name, revenue]) => ({
        name,
        revenue: Number(revenue.toFixed(2)),
      }));
    } else {
      // Default / Month view: Distribute into 4 clean weekly slots matching layout
      const weeklyBins = {
        "Week 1": 0,
        "Week 2": 0,
        "Week 3": 0,
        "Week 4": 0,
      };

      getSub.forEach((item) => {
        const price = Number((item?.price || "$0").replace("$", "")) || 0;
        const dateStr = item?.createdAt || item?.date;
        

        const date = new Date(dateStr);
        const dayOfMonth = date.getDate();

        if (dayOfMonth <= 7) weeklyBins["Week 1"] += price;
        else if (dayOfMonth <= 14) weeklyBins["Week 2"] += price;
        else if (dayOfMonth <= 21) weeklyBins["Week 3"] += price;
        else weeklyBins["Week 4"] += price;
      });

      return Object.entries(weeklyBins).map(([name, revenue]) => ({
        name,
        revenue: Number(revenue.toFixed(2)),
      }));
    }
  }, [getSub, currentTimeline]);

  const total = getSub.reduce((sum, item) => {
    const price = item?.price || "$0";
    return sum + Number(price.replace("$", ""));
  }, 0).toFixed(2);

  const metrics = [
    { title: "Total Users", value: totalUsers.length },
    { title: "Total Jobs", value: totalJobs.length },
    { title: "Revenue", value:`$ ${total}` || 0 },
    { title: "Applicants", value: getTotalApply.length },
  ];

  // 🍩 Dynamic Demographics Aggregation from totalUsers prop
  const pieData = React.useMemo(() => {
    if (!totalUsers || totalUsers.length === 0) {
      return [
        { name: "18-24", value: 25.0 },
        { name: "25-34", value: 25.0 },
        { name: "35-44", value: 25.0 },
        { name: "45+", value: 25.0 },
      ];
    }

    const counts = { "18-24": 0, "25-34": 0, "35-44": 0, "45+": 0 };
    const currentYear = new Date().getFullYear();
    let validAgesCount = 0;

    totalUsers.forEach((user) => {
      let age = Number(user?.age);
      
      // Fallback fallback: extract age from birthday strings if present
      if (isNaN(age) && user?.dob) {
        const birthYear = new Date(user.dob).getFullYear();
        if (!isNaN(birthYear)) age = currentYear - birthYear;
      }

      if (!isNaN(age) && age > 0) {
        validAgesCount++;
        if (age >= 18 && age <= 24) counts["18-24"]++;
        else if (age >= 25 && age <= 34) counts["25-34"]++;
        else if (age >= 35 && age <= 44) counts["35-44"]++;
        else if (age >= 45) counts["45+"]++;
        else validAgesCount--; // Drop records falling completely outside parameters
      }
    });

    const divisor = validAgesCount > 0 ? validAgesCount : totalUsers.length;
    
    return [
      { name: "18-24", value: Number(((counts["18-24"] || (divisor / 4)) / divisor * 100).toFixed(1)) },
      { name: "25-34", value: Number(((counts["25-34"] || (divisor / 4)) / divisor * 100).toFixed(1)) },
      { name: "35-44", value: Number(((counts["35-44"] || (divisor / 4)) / divisor * 100).toFixed(1)) },
      { name: "45+", value: Number(((counts["45+"] || (divisor / 4)) / divisor * 100).toFixed(1)) },
    ];
  }, [totalUsers]);

  const COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b"];

  // 📈 SVG Area Chart Calculations
  const svgWidth = 500;
  const svgHeight = 200;
  const paddingLeft = 50;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue)) * 1.1 || 1;

  const points = revenueData.map((d, i) => {
    const x = paddingLeft + (i / (revenueData.length - 1)) * chartWidth;
    const y =
      svgHeight - paddingBottom - (d.revenue / maxRevenue) * chartHeight;
    return { x, y, name: d.name, revenue: d.revenue };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} L ${points[0].x} ${svgHeight - paddingBottom} Z`
    : "";

  // 🍩 SVG Donut Chart Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;


  return (
    <div className="min-h-screen mt-10 md:mt-0 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* STRUCTURED KEYFRAME UTILITIES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dashboardFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleNode {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeUp {
          animation: dashboardFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-row {
          animation: dashboardFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-node {
          transform-origin: center;
          animation: scaleNode 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `,
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8 animate-fadeUp">
          <h1 className="text-3xl font-bold tracking-tight">
            Job Hunt Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time hiring analytics & applications
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-4 bg-white dark:bg-black rounded-xl shadow border border-slate-100 dark:border-slate-900 hover:shadow-lg hover:-translate-y-0.5 transition-all animate-fadeUp"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {m.title}
              </p>
              <h2 className="text-2xl font-bold mt-1">{m.value}</h2>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* NATIVE ANIMATED AREA CHART */}
          <div
            className="lg:col-span-2 p-5 bg-white dark:bg-black rounded-xl shadow border border-slate-100 dark:border-slate-900 animate-fadeUp"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="font-bold mb-4">Revenue Overview</h3>
            <div className="h-70 w-full flex items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="nativeRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>

                  {/* Smooth horizontal unrolling clipping window mask */}
                  <clipPath id="chartRevealMask">
                    <rect
                      x="0"
                      y="0"
                      width={animateCharts ? svgWidth : 0}
                      height={svgHeight}
                      style={{
                        transition: "width 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </clipPath>
                </defs>

                {/* Horizontal Gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const yPos = paddingTop + chartHeight * ratio;
                  const val = Math.round(maxRevenue * (1 - ratio));
                  return (
                    <g key={i} className="opacity-20 dark:opacity-10">
                      <line
                        x1={paddingLeft}
                        y1={yPos}
                        x2={svgWidth - paddingRight}
                        y2={yPos}
                        stroke="currentColor"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={yPos + 4}
                        textAnchor="end"
                        className="text-[10px] fill-slate-500 font-medium"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Masked Animated Paths */}
                <g clipPath="url(#chartRevealMask)">
                  {areaPath && <path d={areaPath} fill="url(#nativeRev)" />}
                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </g>

                {/* Data Points (Stagger entry after lines start unrolling) */}
                {animateCharts &&
                  points.map((p, i) => (
                    <g
                      key={i}
                      className="group cursor-pointer animate-node"
                      style={{ animationDelay: `${i * 120 + 200}ms` }}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#3b82f6"
                        className="stroke-white dark:stroke-black stroke-2"
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="9"
                        fill="#3b82f6"
                        className="opacity-0 group-hover:opacity-20 transition-opacity"
                      />

                      {/* Interactive Data Hover-card */}
                      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect
                          x={p.x - 35}
                          y={p.y - 32}
                          width="70"
                          height="22"
                          rx="4"
                          fill="#0f172a"
                        />
                        <text
                          x={p.x}
                          y={p.y - 17}
                          textAnchor="middle"
                          fill="#fff"
                          className="text-[10px] font-semibold"
                        >
                          ${p.revenue.toFixed(2)}
                        </text>
                      </g>

                      {/* X Labels */}
                      <text
                        x={p.x}
                        y={svgHeight - 10}
                        textAnchor="middle"
                        className="text-[10px] fill-slate-400 dark:fill-slate-500 font-medium"
                      >
                        {p.name}
                      </text>
                    </g>
                  ))}
              </svg>
            </div>
          </div>

          {/* NATIVE ANIMATED DONUT CHART */}
          <div
            className="p-5 bg-white dark:bg-black rounded-xl shadow border border-slate-100 dark:border-slate-900 animate-fadeUp"
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="font-bold mb-4">User Demographics</h3>
            <div className="relative h-55 w-full flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full max-w-50 -rotate-90"
              >
                {pieData.map((slice, i) => {
                  const strokeOffset =
                    circumference - (circumference * slice.value) / 100;
                  const currentRotationOffset =
                    (circumference * accumulatedPercentage) / 100;
                  accumulatedPercentage += slice.value;

                  return (
                    <circle
                      key={i}
                      cx="100"
                      cy="100"
                      r={radius}
                      fill="transparent"
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth="16"
                      strokeDasharray={circumference}
                      // Starts completely hidden, transitions cleanly to real position on mount
                      strokeDashoffset={
                        animateCharts ? strokeOffset : circumference
                      }
                      style={{
                        transformOrigin: "100px 100px",
                        transform: `rotate(${(currentRotationOffset / circumference) * 360}deg)`,
                        transition:
                          "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className="hover:opacity-85 cursor-pointer transition-all"
                    />
                  );
                })}
              </svg>

              {/* CENTER TOTAL DETAILS */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-700 delay-300"
                style={{
                  opacity: animateCharts ? 1 : 0,
                  transform: animateCharts ? "scale(1)" : "scale(0.92)",
                }}
              >
                <p className="text-2xl font-bold tracking-tight">{totalUsers.length}</p>
                <p className="text-xs text-slate-500">Total Users</p>
              </div>
            </div>

            {/* Legend Matrix */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-slate-500 dark:text-slate-400 truncate">
                    {d.name}:
                  </span>
                  <span className="font-bold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;