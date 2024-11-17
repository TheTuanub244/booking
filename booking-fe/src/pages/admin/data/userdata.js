export const userColumns = [
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
];

export const usersRows = [
  {
    id: 1,
    username: "User 1",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail1@gmail.com",
    role: "USER",
    age: 35,
  },
  {
    id: 2,
    username: "User 2",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail2@gmail.com",
    role: "USER",
    age: 42,
  },
  {
    id: 3,
    username: "User 3",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail3@gmail.com",
    role: "ADMIN",
    age: 45,
  },
  {
    id: 4,
    username: "User 4",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail4@gmail.com",
    role: "PARTNER",
    age: 16,
  },
  {
    id: 5,
    username: "User 5",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail5@gmail.com",
    role: "USER",
    age: 22,
  },
  {
    id: 6,
    username: "User 6",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail6@gmail.com",
    role: "USER",
    age: 15,
  },
  {
    id: 7,
    username: "User 7",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail7@gmail.com",
    role: "USER",
    age: 44,
  },
  {
    id: 8,
    username: "User 8",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail8@gmail.com",
    role: "USER",
    age: 36,
  },
  {
    id: 9,
    username: "User 9",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail9@gmail.com",
    role: "USER",
    age: 65,
  },
  {
    id: 10,
    username: "User 10",
    img: "https://images8.alphacoders.com/657/657974.jpg",
    email: "useremail10@gmail.com",
    role: "USER",
    age: 65,
  },
];
