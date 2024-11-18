import "./RoomTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { roomColumns, roomRows } from "../../data/roomdata"; 
import { useState } from "react";
import { Link } from "react-router-dom";

const RoomTable = () => {
  const [data, setData] = useState(roomRows); 
  console.log(data);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
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
        columns={roomColumns.concat(actionColumn)} // Updated to use roomColumns
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default RoomTable;
