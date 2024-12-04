import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ImageGallery from "../Image/ImageGallery";

const PropertyDetail = ({ propertyData }) => {
  const {
    _id,
    name,
    property_type,
    address,
    owner_id,
    images,
    description,
    rate,
  } = propertyData;

  const fullAddress = `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;

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
          to={`/admin/property/edit/${_id}`}
        >
          Edit
        </Button>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {property_type}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 8 }} />
            <Typography variant="subtitle1">{fullAddress}</Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            ⭐ {rate}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Owner ID: {owner_id}
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageGallery images={images} name={name} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetail;
