import React, { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { useCustomer } from "../context/CustomerContext";
import FullPageLoader from "./FullPageLoader";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Box,
  Typography,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CustomerList = ({ onEdit }) => {
  const {
    customers,
    loading,
    setSearchTerm,
    page,
    setPage,
    total,
    limit,
    deleteCustomer,
  } = useCustomer();

  const [searchTerm, setLocalSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 3000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  React.useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  const handleDelete = () => {
    if (selectedCustomer) {
      deleteCustomer(selectedCustomer._id);
      setOpenDialog(false);
    }
  };

  const openDeleteDialog = (customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedCustomer(null);
  };

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phoneNumber" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <Button
              onClick={() => onEdit(row.original)}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => openDeleteDialog(row.original)}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [onEdit]
  );

  const tableInstance = useTable({ columns, data: customers }, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  if (loading) return <FullPageLoader loading={loading} />;

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Customer List
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
      />

      {/* Table */}
      <Table {...getTableProps()} sx={{ mt: 2 }}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={row._id}>
                {row.cells.map((cell, index) => (
                  <TableCell {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>
              {selectedCustomer?.firstName} {selectedCustomer?.lastName}
            </strong>
            ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerList;
