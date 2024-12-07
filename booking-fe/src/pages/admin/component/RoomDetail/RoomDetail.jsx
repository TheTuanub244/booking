import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImageGallery from "../Image/ImageGallery";

const RoomDetail = ({ roomData }) => {
  const {
    _id,
    name,
    property_id, // Only display the property name
    address,
    images,
    description,
    rate,
    capacity,
    price_per_night,
    size,
    facility,
  } = roomData;

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
          to={`/admin/room/edit/${_id}`}
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
            {property_id.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 8 }} />
            <Typography variant="subtitle1">{fullAddress}</Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            ⭐ {rate}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Size: {size} m²
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Capacity: {capacity.adults} adults, {capacity.childs.count} child
            (Age: {capacity.childs.age})
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Price per Night:
            <Typography variant="body2" component="span" color="text.primary">
              ${price_per_night.weekday} (Weekdays), ${price_per_night.weekend}{" "}
              (Weekends)
            </Typography>
          </Typography>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Facilities:
          </Typography>
          <ul>
            {facility.map((item, index) => item && <li key={index}>{item}</li>)}
          </ul>
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

RoomDetail.propTypes = {
  roomData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    property_id: PropTypes.shape({
      name: PropTypes.string.isRequired, // Display property name only
    }).isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      ward: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    capacity: PropTypes.shape({
      adults: PropTypes.number.isRequired,
      childs: PropTypes.shape({
        count: PropTypes.number.isRequired,
        age: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    price_per_night: PropTypes.shape({
      weekday: PropTypes.number.isRequired,
      weekend: PropTypes.number.isRequired,
    }).isRequired,
    size: PropTypes.number.isRequired,
    facility: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default RoomDetail;
