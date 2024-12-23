import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [singleCustomer, setSingleCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/customers", {
        params: { searchTerm, page, limit },
      });
      setCustomers(response.data?.data);
      setTotal(response.data?.total);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers!");
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (data) => {
    setLoading(true);
    try {
      await axios.post("/customers", data);
      toast.success("Customer added successfully!");
      fetchCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer!");
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id, data) => {
    setLoading(true);
    try {
      await axios.put(`/customers/${id}`, data);
      toast.success("Customer updated successfully!");
      fetchCustomers();
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer!");
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/customers/${id}`);
      toast.success("Customer deleted successfully!");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer!");
    } finally {
      setLoading(false);
    }
  };
  const fetchCustomerById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/customers/${id}`);
      setSingleCustomer(response.data?.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("Failed to load customer data!");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, page]);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        total,
        limit,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        fetchCustomerById,
        singleCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
