import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyTable from "../../../component/PropertyTable/PropertyTable";
import PropertySection from "../../../component/PropertyCardSection/PropertyCardSection";
import { getAllProperty } from "../../../../../api/propertyAPI";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,
} from "@mui/material";

const PropertyManageList = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperty();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <Box
      className="propertyManageList"
      sx={{
        height: "auto",
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        className="propertyManageListTitle"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" color="textSecondary">
          Property Management
        </Typography>
        <Button
          component={Link}
          to="new"
          variant="outlined"
          color="success"
          size="small"
          sx={{ borderRadius: 1, fontSize: "14px" }}
        >
          Add New
        </Button>
      </Box>

      <Box
        className="viewBy"
        sx={{ display: "flex", alignItems: "center", mb: 2 }}
      >
        <Typography variant="body1" sx={{ mr: 1 }}>
          View By:
        </Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="viewModeSelectLabel">View Mode</InputLabel>
          <Select
            labelId="viewModeSelectLabel"
            id="viewModeSelect"
            value={viewMode}
            onChange={handleViewChange}
            label="View Mode"
            size="small"
          >
            <MenuItem value="cards">Cards</MenuItem>
            <MenuItem value="table">Table</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="propertyContent" sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : viewMode === "cards" ? (
          <PropertySection properties={properties} />
        ) : (
          <PropertyTable properties={properties} />
        )}
      </Box>
    </Box>
  );
};

export default PropertyManageList;
