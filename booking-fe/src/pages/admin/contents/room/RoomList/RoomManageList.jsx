import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoomTable from "../../../component/RoomsTable/RoomTable";
import RoomSection from "../../../component/RoomCardSection/RoomCardSection";
import {
  findRoomByProperty,
  findAvailableRoomWithSearch,
} from "../../../../../api/roomAPI";
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

const RoomManageList = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await findRoomByProperty("67330d931e768dcfe6999375");
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);
  console.log({ rooms });
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <Box
      className="roomManageList"
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
        className="roomManageListTitle"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" color="textSecondary">
          Room Management
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

      <Box className="roomContent" sx={{ flexGrow: 1, overflowY: "auto" }}>
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
          <RoomSection rooms={rooms} />
        ) : (
          <RoomTable rooms={rooms} />
        )}
      </Box>
    </Box>
  );
};

export default RoomManageList;
