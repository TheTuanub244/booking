// UserList.jsx

import React, { useState, useEffect } from "react";
import UserTable from "../../../component/UserTable/UserTable";
import { getPendingUser } from "../../../../../api/userAPI"; 
import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPendingUser(); 
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await deleteUser(id); 
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted successfully.");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete the user. Please try again.");
    }
  };


  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        minHeight: "70vh",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={fetchUsers}
          >
            Retry
          </Button>
        </Box>
      ) : users.length === 0 ? (
        <Typography variant="h6" align="center" mt={4}>
          No users found.
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <UserTable
            users={users}
            onDelete={handleDelete}
          />
        </Box>
      )}
    </Box>
  );
};

export default UserList;
