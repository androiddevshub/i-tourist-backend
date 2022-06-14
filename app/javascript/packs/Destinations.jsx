import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import axios from "axios";
import { EditOutlined } from "@mui/icons-material";
export default function Destinations() {
  const [destinationList, setDestinationList] = useState([]);

  useEffect(() => {
    getDestinationList();
  }, []);

  const getDestinationList = () => {
    axios
      .get(`/api/destinations`)
      .then((res) => {
        setDestinationList(res.data.data);
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={destinationList} />
    </div>
  )
}