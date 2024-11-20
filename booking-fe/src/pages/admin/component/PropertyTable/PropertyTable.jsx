import "./PropertyTable.css";
import { DataGrid } from "@mui/x-data-grid";
import {propertyRows } from "../../data/propertyData";
import { Link } from "react-router-dom";
import { useState } from "react";

const PropertyTable = () => {
  const [data, setData] = useState(propertyRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  function getOwnerName(ownerId) {
    //Get OwnerName by api
    return "Owner";

  }
  
  const propertyColumn = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "owner_id",
      headerName: "Owner Name",
      width: 200,
      renderCell: (params) => {
        return getOwnerName(params.row.owner_id);
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      valueGetter: (params) =>
        `${params.row.address?.province}, ${params.row.address?.district}, ${params.row.address?.ward}, ${params.row.address?.street}`,
    },
    {
      field: "property_type",
      headerName: "Property Type",
      width: 130,
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 80,
      renderCell: (params) => (
        <div className="rateCell">{params.row.rate || "N/A"}</div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link
            to={`view/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
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
        Property Management
        <Link to="/admin/user/new" className="link">
          Add New
        </Link>

      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={propertyColumn}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default PropertyTable;
