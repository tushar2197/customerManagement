import React from "react";
import CustomerList from "../components/CustomerList";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomerListPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        Customer Management
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/customer/add")}
        sx={{ mb: 2 }}
      >
        Add Customer
      </Button>
      <CustomerList
        onEdit={(customer) => navigate(`/customer/edit/${customer._id}`)}
      />
    </Box>
  );
};

export default CustomerListPage;
