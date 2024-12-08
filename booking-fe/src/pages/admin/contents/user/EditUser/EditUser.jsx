import React, { useState, useEffect } from "react";
import { Box, Grid, Button, CircularProgress, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../../../../api/userAPI"; // Ensure the `getUserById` and `updateUser` functions are implemented
import UserForm from "../../../component/UserForm/UserForm"; // Assuming UserForm is in this path

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mockUserData = {
    _id: id,
    username: "john_doe",
    email: "john.doe@example.com",
    role: "user",
    address: {
      province: "Hanoi",
      district: "Ba Dinh",
      ward: "Phuc Xa",
      provinceCode: "01",
      districtCode: "02",
      wardCode: "03",
    },
    password: "password123",
    confirmPassword: "password123",
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        //const data = mockUserData;
        setInitialData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      console.log({ formData });
      navigate(`/admin/users/view/${id}`);
      //const response = await updateUser(formData, accessToken); // Ensure the updateUser function is implemented in your API
      // console.log(response);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !initialData) {
    return (
      <Box
        sx={{
          textAlign: "center",
          padding: 4,
        }}
      >
        <Alert severity="error">
          Failed to load user details. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          component={Link}
          to={`/admin/user/view/${id}`}
        >
          Back to Details
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <UserForm
            initialData={initialData}
            onSubmit={handleUpdateSubmit}
            formTitle="Edit User"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUser;
