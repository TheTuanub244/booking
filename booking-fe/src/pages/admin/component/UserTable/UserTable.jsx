import React, { useState, useEffect } from "react";
import "./UserTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const UserTable = ({ users, onDelete }) => {
  const [data, setData] = useState([]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(""); // Store user name to display in dialog

  useEffect(() => {
    const tableRows = users.map((user) => ({
      ...user,
      id: user._id, 
    }));
    setData(tableRows);
  }, [users]);

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => <div>{params.row.userName}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
      valueGetter: (params) => {
        const { province, district, ward, street } = params.row.address || {};
        return `${street || ""}, ${ward || ""}, ${district || ""}, ${province || ""}`;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) => <div className={`cellWithRole ${params.row.role}`}>{params.row.role}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`view/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDeleteClick(params.row.id, params.row.userName)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];



  const handleDeleteClick = (id, userName) => {
    setSelectedId(id);
    setSelectedUserName(userName);
    setCurrentAction("Delete");
    setDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (currentAction === "Delete" && selectedId) {
      onDelete(selectedId);
    }
    setDialogOpen(false);
    setSelectedId(null);
    setSelectedUserName(""); // Clear the selected username after action
    setCurrentAction(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedId(null);
    setSelectedUserName(""); // Clear the selected username on close
    setCurrentAction(null);
  };

  return (
    <div className={`userTableGridContainer ${dialogOpen ? "blurred" : ""}`}> {/* Apply blur only when dialog is open */}
      <DataGrid
        className="userTableGrid"
        rows={data}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />

      <ConfirmationDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmAction}
        title="Confirmation"
        content={`Are you sure you want to delete the user "${selectedUserName}"?`}
      />
    </div>
  );
};

export default UserTable;
