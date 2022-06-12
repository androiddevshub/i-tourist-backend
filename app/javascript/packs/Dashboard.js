import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Table, Tabs, Space } from "antd";
import "./dashboard.css";
import TourGuidesTable from "./TourGuidesTable";
import DestinationsTable from "./DestinationsTable";
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
            <TourGuidesTable />
          </TabPane>
          <TabPane tab="Destinations" key="2">
            <DestinationsTable />
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
