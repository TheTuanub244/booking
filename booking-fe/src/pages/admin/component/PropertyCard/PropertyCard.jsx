import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const propertyId = property._id;

  return (
    <Card
      component={Link}
      to={`view/${propertyId}`}
      sx={{
        width: 280, // Fixed width
        height: 170, // Fixed height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
          boxShadow: 6,
        },
        position: "relative", // Allow positioning elements within the card
      }}
    >
      <CardMedia
        component="img"
        height="90" // Fixed height for the image
        image={property.images[0]}
        alt={property.name}
        sx={{
          objectFit: "cover", // Ensures image is scaled properly inside the fixed space
        }}
      />

      <CardContent sx={{ padding: "8px 16px", flexGrow: 1 }}>
        {/* Title with tooltip */}
        <Tooltip title={property.name} placement="top" arrow>
          <Typography
            variant="body2" // Smaller font size
            noWrap // Ensures that the text overflows with ellipsis if too long
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "1rem", // Custom smaller size for title
            }}
            gutterBottom
          >
            {property.name}
          </Typography>
        </Tooltip>

        {/* Address with tooltip */}
        <Tooltip
          title={`${property.address.street}, ${property.address.ward}, ${property.address.district}, ${property.address.province}`}
          placement="top"
          arrow
        >
          <Typography
            variant="body2" // Smaller font size
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "0.875rem", // Custom smaller size for address
            }}
          >
            {property.address.street}, {property.address.ward},{" "}
            {property.address.district}, {property.address.province}
          </Typography>
        </Tooltip>
      </CardContent>

      {/* Rate at the bottom-right of the card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        <Typography
          variant="body2"
          color="primary"
          sx={{ fontSize: "0.875rem" }}
        >
          ⭐ {property.rate}
        </Typography>
      </Box>
    </Card>
  );
};

export default PropertyCard;
