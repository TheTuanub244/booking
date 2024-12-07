import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserDetail = ({ userData }) => {
  const {
    _id,
    userName,
    email,
    phoneNumber,
    role,
    address,
    dob,
    isAdmin,
    resetPasswordTokenStatus,
  } = userData;

  const fullAddress = `${address.ward}, ${address.district}, ${address.province}`;

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
          startIcon={<FontAwesomeIcon icon={faEdit} />}
          component={Link}
          to={`/admin/user/edit/${_id}`}
        >
          Edit
        </Button>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {userName}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Email: {email}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Phone: {phoneNumber}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Role: {role}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Admin: {isAdmin ? "Yes" : "No"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Address: {fullAddress}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Date of Birth: {new Date(dob).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Password Reset Token Status: {resetPasswordTokenStatus}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

UserDetail.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    role: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.shape({
      ward: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired,
    }).isRequired,
    dob: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    resetPasswordTokenStatus: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDetail;
