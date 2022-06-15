import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import axios from "axios";
import { EditOutlined } from "@mui/icons-material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Container } from "@mui/material";
import "./destinations.css"
export default function Destinations() {
  const [destinationList, setDestinationList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [formType, setFormType] = useState("");
  
  const [formState, setFormState] = useState({});

  const handleClickOpen = () => {
    setFormType("add")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDestinationList();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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

  const handleSaveDestination = () => {
  
      console.log(formState, "ffee")
    if (formType === "add") {
      axios
        .post("/api/destinations", formState)
        .then((res) => {
          setFormState({
            name: "",
            description: "",
            location: "",
            price: null
          })
          setOpen(false);
          getDestinationList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if(formType === "edit") {
      axios
        .put(`/api/destinations/${formState.id}`, formState)
        .then((res) => {
          setFormState({
            name: "",
            description: "",
            location: "",
            price: null
          })
          setOpen(false);
          getDestinationList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleUpdateDialogOpen = (record) => {
    setFormType("edit")
    console.log(record)
    setOpen(true);
    setFormState(record)
  }


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
          <EditOutlined onClick={()=> handleUpdateDialogOpen(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Destination
      </Button>
      <Table columns={columns} dataSource={destinationList} />
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        <DialogTitle>New Destination</DialogTitle>
        <DialogContent>
          <div className="textfield">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={formState.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              minRows={4}
              multiline
              variant="standard"
              value={formState.description}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={formState.location}
              onChange={handleChange}
              
            />
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={formState.price}
              onChange={handleChange}
            />
          </div>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveDestination}>Save</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
}