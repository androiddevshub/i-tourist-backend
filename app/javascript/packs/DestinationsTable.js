import React, { useState, useEffect, useRef, createRef } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import { EditOutlined } from "@mui/icons-material";
export default function DestinationsTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [destinationList, setDestinationList] = useState([]);
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);
  const [formType, setFormType] = useState("");

  const addDestination = () => {
    setFormType("add");
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    getDestinationList();
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);

    if (formType == "add") {
      console.log("add values", values);
      axios
        .post("/api/destinations", values)
        .then((res) => {
          console.log(res);
          form.resetFields();
          setLoading(false);
          setIsModalVisible(false);
          getDestinationList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("edit values", values);

      axios
        .put(`/api/destinations/${id}`, values)
        .then((res) => {
          getDestinationList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

  const updateDestination = (record) => {
    setFormType("update");
    setInitialValues({
      id: record.id,
      name: record.name,
      description: record.description,
      location: record.location,
      price: record.price,
    });
    setIsModalVisible(true);
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
          <EditOutlined onClick={() => updateDestination(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={addDestination}>
        Add Destination
      </Button>
      <Table columns={columns} dataSource={destinationList} />
      <Modal
        title="Destinations"
        visible={isModalVisible}
        onOk={handleOk}
        width={700}
        onCancel={handleCancel}
        footer={[]}
        getContainer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input location!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" loading={loading} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
