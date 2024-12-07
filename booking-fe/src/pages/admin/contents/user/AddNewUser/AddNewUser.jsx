import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../../component/UserForm/UserForm";

//import { createUser } from "../../../../../api/userAPI";

const AddNewUser = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (Data) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      console.log({ Data });
      //const response = await createUser(formData, accessToken);
      //console.log(response);
      navigate(`/admin/user`);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

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
          to="/admin/users" // Link to your user list
        >
          Back to User List
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <UserForm
            initialData={{
              _id: "",
              username: "",
              email: "",
              role: "",
              password: "",
              confirmPassword: "",
              address: {
                province: "",
                district: "",
                ward: "",
                provinceCode: "",
                districtCode: "",
                wardCode: "",
              },
            }}
            onSubmit={handleCreateSubmit}
            formTitle="Create New User"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewUser;
