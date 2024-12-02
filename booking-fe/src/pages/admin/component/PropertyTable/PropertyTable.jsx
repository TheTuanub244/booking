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
    id: property._id, 
  }));

  function getOwnerName(ownerId) {
   
    return "Owner";
  }

  const propertyColumn = [
    {
      field: "name",
      headerName: "Name",
      width: 170,
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
      width: 280,
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
      className="propertyTableGrid"
      rows={tableRows}
      columns={propertyColumn}
      pageSize={6}
      rowsPerPageOptions={[6]}
    />
  );
};

export default PropertyTable;
