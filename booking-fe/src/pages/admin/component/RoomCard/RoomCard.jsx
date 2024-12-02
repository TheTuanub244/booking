import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const { name, property_id, price_per_night, images, size, type } = room;
  const propertyName = property_id?.name || "Unknown Property";

  return (
    <Card
      component={Link}
      to={`view/${room._id}`}
      sx={{
        width: 320,  
        height: 350, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
          boxShadow: 6,
        },
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="160" 
        image={images[0] || 'https://via.placeholder.com/320x160'} 
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ padding: "8px 16px", flexGrow: 1 }}>
        <Tooltip title={name} placement="top" arrow>
          <Typography
            variant="body2"
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "1rem",
            }}
            gutterBottom
          >
            {name}
          </Typography>
        </Tooltip>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
          Property: {propertyName}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
          {type} - {size} m²
        </Typography>
      </CardContent>

      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          fontSize: "0.875rem", 
        }}
      >
        <Typography variant="body2" color="text.primary" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>
          Price per Night
        </Typography>

        <Typography variant="body2" color="primary" sx={{ fontSize: "0.875rem" }}>
          Weekday: {price_per_night?.weekday ? `${price_per_night.weekday.toLocaleString()} VND` : "N/A"}
        </Typography>

        <Typography variant="body2" color="primary" sx={{ fontSize: "0.875rem" }}>
          Weekend: {price_per_night?.weekend ? `${price_per_night.weekend.toLocaleString()} VND` : "N/A"}
        </Typography>
      </Box>
    </Card>
  );
};

export default RoomCard;
