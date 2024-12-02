import "./RoomTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";

const RoomTable = ({ rooms }) => {
  const [data, setData] = useState(rooms);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const tableRows = rooms.map((room) => ({
    ...room,
    id: room._id, 
  }));

  const getPricePerNight = (price) => {
    if (!price) return "N/A";
    return `Weekday: ${price.weekday.toLocaleString()} VND / Weekend: ${price.weekend.toLocaleString()} VND`;
  };

  const roomColumn = [
    {
      field: "name",
      headerName: "Room Name",
      width: 200,
    },
    {
      field: "property_id",
      headerName: "Property Name",
      width: 200,
      renderCell: (params) => params.row.property_id?.name || "Unknown Property",
    },
    {
      field: "type",
      headerName: "Room Type",
      width: 130,
      renderCell: (params) => params.row.type || "N/A", 
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 150,
      renderCell: (params) => (
        `${params.row.capacity?.adults || 0} Adults / ${params.row.capacity?.childs?.count || 0} Childs`
      ),
    },
    {
      field: "price_per_night",
      headerName: "Price per Night (Weekday/Weekend)",
      width: 350,
      renderCell: (params) => getPricePerNight(params.row.price_per_night),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`view/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      className="roomTableGrid"
      rows={tableRows}
      columns={roomColumn}
      pageSize={6}
      rowsPerPageOptions={[6]}
    />
  );
};

export default RoomTable;
