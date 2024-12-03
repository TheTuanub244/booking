import "./UserTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { usersRows } from "../../data/userdata";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserTable = () => {
  const [data, setData] = useState(usersRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

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
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithRole ${params.row.role}`}>
            {params.row.role}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
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
        );
      },
    },
  ];
  return (
    <div className="userTable">
      <div className="userTableTitle">
        User Management
        <Link to="/admin/user/new" className="addNewButton">
          Add New
        </Link>
      </div>
      <DataGrid
        className="userTableGrid"
        rows={data}
        columns={userColumn}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default UserTable;
