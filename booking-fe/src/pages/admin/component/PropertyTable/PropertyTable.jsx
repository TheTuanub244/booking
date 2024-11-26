import "./PropertyTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";

const PropertyTable = ({ properties }) => {
  const [data, setData] = useState(properties);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };
  const tableRows = properties.map((property) => ({
    ...property,
    id: property._id, // Map `_id` to `id`
  }));

  function getOwnerName(ownerId) {
    // Placeholder function to get owner name by owner ID
    return "Owner";
  }

  const propertyColumn = [
    {
      field: "_id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "owner_id",
      headerName: "Owner Name",
      width: 200,
      renderCell: (params) => getOwnerName(params.row.owner_id),
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      valueGetter: (params) =>
        `${params.row.address?.province || ""}, ${params.row.address?.district || ""}, ${params.row.address?.ward || ""}, ${params.row.address?.street || ""}`,
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
      className="propertyTableGrid"
      rows={tableRows}
      columns={propertyColumn}
      pageSize={6}
      rowsPerPageOptions={[6]}
      checkboxSelection
    />
  );
};

export default PropertyTable;
