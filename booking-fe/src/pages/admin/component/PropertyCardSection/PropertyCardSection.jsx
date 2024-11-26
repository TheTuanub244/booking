import React from "react";
import { Grid } from "@mui/material";
import PropertyCard from "../PropertyCard/PropertyCard";

const PropertySection = ({ properties }) => {
  if (!properties.length) {
    return <p>No properties available.</p>;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
        maxWidth: "100%",
        height: "600px",
      }}
    >
      {properties.slice(0, 9).map((property) => (
        <Grid
          item
          key={property._id}
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertySection;
