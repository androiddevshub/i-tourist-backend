import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Table, Tabs, Space } from "antd";
import "./dashboard.css";
import TourGuides from "./TourGuides";
export default function Dashboard() {
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  useEffect(() => {
    if (!localStorage.auth_token) {
      navigate("/");
    }
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="logout-button">
        <Button
          onClick={handleLogout}
          variant="outlined"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </div>
      <div className="main">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Tour Guides" key="1">
            <TourGuides />
          </TabPane>
          <TabPane tab="Tourist" key="2">
            Tourist Data
          </TabPane>
          <TabPane tab="Destinations" key="3">
            nothing
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
