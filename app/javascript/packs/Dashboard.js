import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import "./dashboard.css";
export default function Dashboard() {
  const navigate = useNavigate();
  const [tourGuideList, setTourGuideList] = useState([]);
  useEffect(() => {
    if (!localStorage.auth_token) {
      navigate("/");
    }
    getTourGuidesList();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getTourGuidesList = () => {
    axios
      .get(`/api/users/tour_guides`)
      .then((res) => {
        setTourGuideList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTourGuide = (user_id, active) => {
    axios
      .put(`/api/users/tour_guide/${user_id}`, {
        active: active,
      })
      .then((res) => {
        getTourGuidesList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Certificate Url",
      dataIndex: "certificate_url",
      key: "certificate_url",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.active === true ? (
            "Approved"
          ) : (
            <div>
              <Button
                variant="contained"
                onClick={() => updateTourGuide(record.id, true)}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => updateTourGuide(record.id, false)}
              >
                Reject
              </Button>
            </div>
          )}
        </Space>
      ),
    },
  ];

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
        <Table columns={columns} dataSource={tourGuideList} />
      </div>
    </div>
  );
}
