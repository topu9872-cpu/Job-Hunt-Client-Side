"use client";

import React from "react";
import { 
  FaBriefcase, 
  FaFileLines, 
  FaClock 
} from "react-icons/fa6";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

export default function JobSeekerDashboard() {
  // Mock data for Job Seeker's core metrics
  const stats = [
    { id: 1, name: "Applications Sent", value: "24", icon: FaFileLines, desc: "+3 this week" },
    { id: 2, name: "Interviews Scheduled", value: "3", icon: FaClock, desc: "Next on Tuesday" },
    { id: 3, name: "Offers Received", value: "1", icon: FaBriefcase, desc: "Decision pending" },
  ];

  // Mock analytics data tracking applications and progress over months
  const analyticsData = [
    { month: "Jan", Applied: 4, Interviews: 0, Offers: 0 },
    { month: "Feb", Applied: 8, Interviews: 1, Offers: 0 },
    { month: "Mar", Applied: 12, Interviews: 2, Offers: 0 },
    { month: "Apr", Applied: 18, Interviews: 4, Offers: 1 },
    { month: "May", Applied: 15, Interviews: 3, Offers: 0 },
    { month: "Jun", Applied: 24, Interviews: 6, Offers: 1 },
  ];

  // Theme-friendly Custom Tooltip component for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-xl text-xs text-white">
          <p className="font-bold mb-2 border-b border-white/10 pb-1">{label} Activity</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-medium py-0.5">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex justify-center min-h-screen bg-transparent text-current transition-colors duration-200">
      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Seeker Overview</h1>
          <p className="text-sm opacity-70 mt-1">Track your application performance metrics and recruitment funnels.</p>
        </div>

        {/* 3-Column Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="p-6 rounded-xl border border-white/10 bg-white/2 backdrop-blur-md shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium opacity-70">{stat.name}</span>
                  <div className="p-2 rounded-lg bg-white/5">
                    <IconComponent className="text-lg opacity-80" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight">{stat.value}</div>
                  <p className="text-xs opacity-50 mt-1">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recharts Analytics Section */}
        <div className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-md p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold">Application Trends</h2>
            <p className="text-xs opacity-60 mt-0.5">Comparison of sent applications vs interview callbacks over time.</p>
          </div>

          {/* Chart Wrapper Container with Explicit Height */}
          <div className="w-full h-88text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {/* Smooth Gradient Fill For "Applied" Line */}
                  <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  {/* Smooth Gradient Fill For "Interviews" Line */}
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                {/* Grid Lines Config */}
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} vertical={false} />
                
                {/* Axis Config */}
                <XAxis dataKey="month" stroke="currentColor" opacity={0.5} tickLine={false} />
                <YAxis stroke="currentColor" opacity={0.5} tickLine={false} />
                
                {/* Tooltip & Legend */}
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.1 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '20px', opacity: 0.8 }} />

                {/* Area Graphs */}
                <Area 
                  name="Applications Sent"
                  type="monotone" 
                  dataKey="Applied" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorApplied)" 
                />
                <Area 
                  name="Interviews Secured"
                  type="monotone" 
                  dataKey="Interviews" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorInterviews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}