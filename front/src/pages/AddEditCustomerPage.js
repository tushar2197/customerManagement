import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useCustomer } from "../context/CustomerContext";

const AddEditCustomerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCustomerById, singleCustomer, addCustomer, updateCustomer } =
    useCustomer();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        setLoading(true);

        await fetchCustomerById(id);
      };
      fetchCustomer();
    }
  }, [id]);

  useEffect(() => {
    if (singleCustomer) {
      setCustomer(singleCustomer);
      setLoading(false);
    }
  }, [singleCustomer]);
  const handleSubmit = async (data) => {
    try {
      if (id) {
        await updateCustomer(id, data);
      } else {
        await addCustomer(data);
      }
      navigate("/customer");
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        {id ? "Edit Customer" : "Add Customer"}
      </Typography>
      {customer && (
        <CustomerForm
          existingCustomer={customer}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/customer")}
        />
      )}
    </Box>
  );
};

export default AddEditCustomerPage;
