"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";

// 1. Define table columns matching the screenshot layout
const columns = [
  { id: "name", label: "Name" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  { id: "email", label: "Email" },
];

// 2. Mock dataset accurately representing data from Screenshot 2026-06-06 185228.png
const initialRows = [
  { id: "1", name: "Kate Moore", role: "CEO", status: "active", email: "kate@acme.com" },
  { id: "2", name: "John Smith", role: "CTO", status: "active", email: "john@acme.com" },
  { id: "3", name: "Sara Johnson", role: "CMO", status: "on-leave", email: "sara@acme.com" },
  { id: "4", name: "Michael Brown", role: "CFO", status: "active", email: "michael@acme.com" },
  { id: "5", name: "Emily Davis", role: "Product Manager", status: "inactive", email: "emily@acme.com" },
];

// 3. Dynamic status map configuration for badge rendering styles
const statusMap = {
  "active": {
    label: "Active",
    badgeClass: "bg-[#14291f] text-[#4ade80] border border-[#163f2b]"
  },
  "on-leave": {
    label: "On Leave",
    badgeClass: "bg-[#2e1d11] text-[#fb923c] border border-[#4a2e1b]"
  },
  "inactive": {
    label: "Inactive",
    badgeClass: "bg-[#2d1919] text-[#f87171] border border-[#4c2424]"
  }
};

const DashBoardTable = () => {
  const [users] = useState(initialRows);

  // Dynamic cell renderer helper
  const renderCell = (item, columnKey) => {
    const value = item[columnKey];

    switch (columnKey) {
      case "name":
        return <span className="text-white font-semibold text-[17px]">{value}</span>;
      
      case "role":
        return <span className="text-[#e4e4e7] font-medium text-[16px]">{value}</span>;
      
      case "status":
        const currentStatus = statusMap[value] || { label: value, badgeClass: "bg-gray-800 text-gray-400" };
        return (
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${currentStatus.badgeClass}`}>
            {currentStatus.label}
          </span>
        );
      
      case "email":
        return <span className="text-[#a1a1aa] font-normal text-[16px] truncate max-w-[180px] block">{value}</span>;
      
      default:
        return value;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-[#09090b] min-h-screen flex items-start justify-center pt-12 font-sans antialiased">
      
      {/* Outer Dark Table Container mimicking Screenshot 2026-06-06 185228.png layout */}
      <div className="w-full bg-[#18181b] rounded-2xl border border-[#27272a] shadow-2xl overflow-hidden p-2">
        
        <Table 
          aria-label="Dark mode team management data table"
          className="w-full bg-transparent"
        >
          <Table.ScrollContainer>
            <Table.Content>
              
              {/* Header Columns Mapping */}
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column 
                    id={column.id}
                    className="text-[#71717a] text-[15px] font-bold px-6 py-4 border-b border-[#27272a] text-left select-none tracking-wide"
                  >
                    {column.label}
                  </Table.Column>
                )}
              </Table.Header>

              {/* Data Body Mapping */}
              <Table.Body items={users}>
                {(item) => (
                  <Table.Row 
                    id={item.id} 
                    className="border-b border-[#27272a]/50 last:border-none transition duration-150 ease-in-out hover:bg-[#202024]"
                  >
                    {(columnKey) => (
                      <Table.Cell className="px-6 py-4.5 align-middle">
                        {renderCell(item, columnKey)}
                      </Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>

            </Table.Content>
          </Table.ScrollContainer>
        </Table>

      </div>
    </div>
  );
};

export default DashBoardTable;