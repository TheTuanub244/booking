// PropertyDetail.jsx

import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ImageGallery from "../Image/ImageGallery";
import PropTypes from "prop-types"; // Import PropTypes

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
          {Array.isArray(images) && images.length > 0 ? (
            <ImageGallery images={images} name={name} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                border: "1px dashed #ccc",
                borderRadius: 2,
                padding: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                No Images Available
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

PropertyDetail.propTypes = {
  propertyData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    property_type: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      ward: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired,
    }).isRequired,
    owner_id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

export default PropertyDetail;
