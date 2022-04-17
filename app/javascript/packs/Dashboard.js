import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.auth_token) {
      navigate("/");
    }
  }, []);

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
    </div>
  );
}
