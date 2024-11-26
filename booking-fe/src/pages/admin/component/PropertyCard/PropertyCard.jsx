// src/components/PropertyCard.js

import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  // Determine the property ID field (use _id or id based on your data structure)
  const propertyId = property._id || property.id;

  return (
    <Card
      component={Link}
      to={`view/${propertyId}`}
      sx={{
        maxWidth: 320,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none", // Remove underline from the link
        color: "inherit", // Inherit text color
        "&:hover": {
          boxShadow: 6, // Add a shadow on hover for better UX
        },
      }}
    >

      <CardMedia
        component="img"
        height="140"
        image={property.images[0]}
        alt={property.name}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {property.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.address.street}, {property.address.ward}, {property.address.district},{" "}
          {property.address.province}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="body1" color="primary">
            ⭐ {property.rate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
