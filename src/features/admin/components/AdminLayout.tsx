import React from "react";
import { AdminDashboard } from "./AdminDashboard";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#0f0f0f",
      }}
    >
      <AdminHeader />
      <main style={{ flex: 1 }}>
        <AdminDashboard />
      </main>
    </div>
  );
};

