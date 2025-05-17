import React, { useState } from "react";
import UserList from "./UserList";
import CreateUser from "../Forms/Signup/Signup";
import CreateContent from "./CreteContent";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">AdminPanel</h1>
      <div className="tabs">
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users List
        </button>
        <button
          className={activeTab === "createUser" ? "active" : ""}
          onClick={() => setActiveTab("createUser")}
        >
          Create User
        </button>
        <button
          className={activeTab === "content" ? "active" : ""}
          onClick={() => setActiveTab("content")}
        >
          Content Management
        </button>
      </div>

      <div className="content-container">
        {activeTab === "users" && <UserList />}
        {activeTab === "createUser" && <CreateUser />}
        {activeTab === "content" && <CreateContent />}
      </div>
    </div>
  );
};

export default AdminDashboard;
