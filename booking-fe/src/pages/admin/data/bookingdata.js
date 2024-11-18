export const bookingColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "user_id",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.user_img} alt="avatar" />
            {params.row.user_name}
          </div>
        );
      },
    },
    {
      field: "property",
      headerName: "Property",
      width: 200,
    },
    {
      field: "room_count",
      headerName: "Room Count",
      width: 100,
    },
    {
      field: "check_in_date",
      headerName: "Check-In Date",
      width: 150,
    },
    {
      field: "check_out_date",
      headerName: "Check-Out Date",
      width: 150,
    },
    {
      field: "adults",
      headerName: "Adults",
      width: 100,
    },
    {
      field: "child_count",
      headerName: "Child Count",
      width: 120,
    },
    {
      field: "child_age",
      headerName: "Child Age",
      width: 120,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      width: 120,
    },
    {
      field: "booking_status",
      headerName: "Booking Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.booking_status}`}>
            {params.row.booking_status}
          </div>
        );
      },
    },
  ];
  
  export const bookingsRows = [
    {
      id: 1,
      user_id: "User 1",
      user_img: "https://images8.alphacoders.com/657/657974.jpg",
      user_name: "John Doe",
      property: "Beachside Villa",
      room_count: 2,
      check_in_date: "2024-12-01",
      check_out_date: "2024-12-05",
      adults: 2,
      child_count: 1,
      child_age: 5,
      total_price: 1200,
      booking_status: "CONFIRMED",
    },
    {
      id: 2,
      user_id: "User 2",
      user_img: "https://images8.alphacoders.com/657/657974.jpg",
      user_name: "Jane Smith",
      property: "Mountain Cabin",
      room_count: 1,
      check_in_date: "2024-11-20",
      check_out_date: "2024-11-25",
      adults: 1,
      child_count: 0,
      child_age: null,
      total_price: 800,
      booking_status: "PENDING",
    },
    {
      id: 3,
      user_id: "User 3",
      user_img: "https://images8.alphacoders.com/657/657974.jpg",
      user_name: "Alice Brown",
      property: "City Apartment",
      room_count: 3,
      check_in_date: "2024-11-18",
      check_out_date: "2024-11-22",
      adults: 4,
      child_count: 2,
      child_age: 8,
      total_price: 2000,
      booking_status: "CANCELLED",
    },
  ];
  