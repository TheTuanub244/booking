// src/pages/EditProperty.jsx

import React, { useState, useEffect } from "react";
import { Box, Grid, Button, CircularProgress, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPropertyById } from "../../../../../api/propertyAPI";
import PropertyForm from "../../../component/PropertyForm/PropertyForm";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setInitialData(data);
      } catch (err) {
        console.error("Error fetching property data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdateSubmit = async (updatedData) => {
    console.log(updatedData);
    // After successful update, you can navigate or show a success message
    navigate(`/admin/property/view/${id}`);
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
          Failed to load property details. Please try again later.
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
          to={`/admin/property/view/${id}`}
        >
          Back to Details
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <PropertyForm
            initialData={initialData}
            onSubmit={handleUpdateSubmit}
            formTitle="Edit Property"
          />
        </Grid>

        {/* You can include additional components or information here if needed */}
      </Grid>
    </Box>
  );
};

export default EditProperty;
