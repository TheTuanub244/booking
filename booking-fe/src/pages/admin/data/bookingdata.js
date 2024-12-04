export const mockBookings = [
  {
    _id: "booking1",
    user_id: {
      _id: "user1",
      userName: "John Doe",
      // Add other user fields as necessary
    },
    room_id: [
      { _id: "room1", name: "Deluxe Room" },
      { _id: "room2", name: "Standard Room" },
    ],
    property: {
      _id: "property1",
      name: "Sunshine Apartments",
      // Add other property fields as necessary
    },
    check_in_date: "2023-09-15T00:00:00.000Z",
    check_out_date: "2023-09-20T00:00:00.000Z",
    capacity: {
      adults: 2,
      childs: {
        count: 1,
        age: 5,
      },
      room: 1,
    },
    total_price: 750,
    booking_status: "CONFIRMED", // Possible values: PENDING, CONFIRMED, CANCELLED
    payment_status: "PAID", // Possible values: UNPAID, PAID
    request: "Late check-in, please.",
  },
  {
    _id: "booking2",
    user_id: {
      _id: "user2",
      userName: "Jane Smith",
      // Add other user fields as necessary
    },
    room_id: [{ _id: "room3", name: "Suite" }],
    property: {
      _id: "property2",
      name: "Oceanview Resort",
      // Add other property fields as necessary
    },
    check_in_date: "2023-10-01T00:00:00.000Z",
    check_out_date: "2023-10-05T00:00:00.000Z",
    capacity: {
      adults: 4,
      childs: {
        count: 2,
        age: 8,
      },
      room: 2,
    },
    total_price: 1200,
    booking_status: "PENDING",
    payment_status: "UNPAID",
    request: "",
  },
];
