import React, { useState, useEffect } from "react";
import "./BookingTable.css";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

const BookingTable = ({ bookings, onDelete }) => {
  const [data, setData] = useState([]);

  // States for confirmation dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // To store booking details

  useEffect(() => {
    const tableRows = bookings.map((booking) => ({
      ...booking,
      id: booking._id,
    }));
    setData(tableRows);
  }, [bookings]);

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 100,
      renderCell: (params) => (
        <div>{params.row.user_id?.userName || "N/A"}</div>
      ),
    },
    {
      field: "propertyName",
      headerName: "Property",
      width: 180,
      valueGetter: (params) => params.row.property?.name || "N/A",
    },
    {
      field: "rooms",
      headerName: "Rooms",
      width: 80,
      valueGetter: (params) => params.row.room_id?.length || 0,
    },
    {
      field: "checkIn",
      headerName: "Check-In Date",
      width: 150,
      valueGetter: (params) =>
        new Date(params.row.check_in_date).toLocaleDateString(),
    },
    {
      field: "checkOut",
      headerName: "Check-Out Date",
      width: 150,
      valueGetter: (params) =>
        new Date(params.row.check_out_date).toLocaleDateString(),
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 100,
      valueGetter: (params) => `$${params.row.total_price || 0}`,
    },
    {
      field: "bookingStatus",
      headerName: "Booking Status",
      width: 150,
      renderCell: (params) => (
        <div className={`bookingCellWithRole ${params.row.booking_status}`}>
          {params.row.booking_status}
        </div>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => (
        <div className={`bookingCellWithRole ${params.row.payment_status}`}>
          {params.row.payment_status}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="bookingCellAction">
          <button
            className="bookingDeleteButton"
            onClick={() =>
              handleDeleteClick(params.row.id, params.row.user_id?.userName)
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteClick = (id, userName) => {
    setSelectedId(id);
    setSelectedBookingDetails({ userName });
    setCurrentAction("Delete");
    setDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (currentAction === "Delete" && selectedId) {
      onDelete(selectedId);
    }
    setDialogOpen(false);
    setSelectedId(null);
    setSelectedBookingDetails(null);
    setCurrentAction(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedId(null);
    setSelectedBookingDetails(null);
    setCurrentAction(null);
  };

  return (
    <div className={`bookingTableGridContainer ${dialogOpen ? "blurred" : ""}`}>
      <DataGrid
        className="bookingTableGrid"
        rows={data}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />

      <ConfirmationDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmAction}
        title={`Delete Booking`}
        content={`Are you sure you want to delete the booking of "${selectedBookingDetails?.userName}"?`}
      />
    </div>
  );
};

export default BookingTable;
