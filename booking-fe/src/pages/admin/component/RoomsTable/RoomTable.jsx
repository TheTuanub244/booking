import "./RoomTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { roomRows } from "../../data/roomdata";
import { useState } from "react";
import { Link } from "react-router-dom";

const RoomTable = () => {
  const [data, setData] = useState(roomRows);
  console.log(data);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const roomColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "property_id",
      headerName: "Property ID",
      width: 150,
      valueGetter: (params) =>
        params.row.property_id?.name || params.row.property_id,
    },
    {
      field: "size",
      headerName: "Size (sqm)",
      width: 100,
    },
    {
      field: "price_per_night",
      headerName: "Price per Night",
      width: 180,
      valueGetter: (params) =>
        `Weekday: $${params.row.price_per_night?.weekday || 0}, Weekend: $${params.row.price_per_night?.weekend || 0}`,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 200,
      valueGetter: (params) => {
        const { adults, children, room } = params.row.capacity || {};
        return `Adults: ${adults || 0}, Children: ${children?.count || 0} (Age: ${children?.age || "N/A"}), Rooms: ${room || 0}`;
      },
    },
    {
      field: "facility",
      headerName: "Facilities",
      width: 200,
      valueGetter: (params) => params.row.facility?.join(", ") || "N/A",
    },
    {
      field: "images",
      headerName: "Images",
      width: 200,
      renderCell: (params) => (
        <div className="cellWithImages">
          {params.row.images?.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`room-${params.row.id}-${idx}`}
              className="cellImg"
            />
          ))}
        </div>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 80,
      renderCell: (params) => (
        <div className="rateCell">{params.row.rating || "N/A"}</div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
    <div className="datatable">
      <div className="datatableTitle">
        Room Management
        <Link to="/admin/room/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={roomColumns} // Updated to use roomColumns
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default RoomTable;
