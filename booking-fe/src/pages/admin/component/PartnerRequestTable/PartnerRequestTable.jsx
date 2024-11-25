import "./PartnerRequestTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { partnerRequestRows } from "../../data/partnerRequestData";
import { Link } from "react-router-dom";
import { useState } from "react";

const PartnerRequestTable = () => {
  const [data, setData] = useState(partnerRequestRows);
  const handleDecline = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleAcept = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  function formatFriendlyDatetime(requestAt) {
    const date = new Date(requestAt);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }

  const userColumn = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "user",
      headerName: "User",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },

    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="acceptButton"
              onClick={() => handleAcept(params.row.id)}
            >
              Accept
            </div>
            <div
              className="declineButton"
              onClick={() => handleDecline(params.row.id)}
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
      <div className="datatableTitle">Partner Request</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumn}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default PartnerRequestTable;
