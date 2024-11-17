export const roomColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "room",
      headerName: "Room",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="room" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
    },
    {
      field: "price",
      headerName: "Price ($)",
      width: 120,
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.availability}`}>
            {params.row.availability}
          </div>
        );
      },
    },
  ];
  
  export const roomRows = [
    {
      id: 1,
      name: "Deluxe Suite",
      img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=",
      address: "123 Main Street, Cityville",
      price: 200,
      availability: "Available",
    },
    {
      id: 2,
      name: "Ocean View Room",
      img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=",
      address: "456 Beach Road, Seaside",
      price: 300,
      availability: "Available",
    },
    {
      id: 3,
      name: "Standard Room",
      img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=",
      address: "789 Downtown Blvd, Metropolis",
      price: 150,
      availability: "Unavailable",
    },
    {
      id: 4,
      name: "Executive Suite",
      img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=",
      address: "101 Corporate Ave, Business City",
      price: 400,
      availability: "Available",
    },
    {
      id: 5,
      name: "Penthouse",
      img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=",
      address: "202 Luxury Lane, Uptown",
      price: 500,
      availability: "Unavailable",
    },
    {
      id: 6,
      name: "Family Room",
      img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=",
      address: "303 Suburb St, Familyville",
      price: 180,
      availability: "Available",
    },
    {
        id: 7,
        name: "Deluxe Suite",
        img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=",
        address: "123 Main Street, Cityville",
        price: 200,
        availability: "Available",
      },
      {
        id: 8,
        name: "Ocean View Room",
        img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=",
        address: "456 Beach Road, Seaside",
        price: 300,
        availability: "Available",
      },
      {
        id: 9,
        name: "Standard Room",
        img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=",
        address: "789 Downtown Blvd, Metropolis",
        price: 150,
        availability: "Unavailable",
      },
      {
        id: 10,
        name: "Executive Suite",
        img: "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=",
        address: "101 Corporate Ave, Business City",
        price: 400,
        availability: "Available",
      },
      {
        id: 11,
        name: "Penthouse",
        img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=",
        address: "202 Luxury Lane, Uptown",
        price: 500,
        availability: "Unavailable",
      },
      {
        id: 12,
        name: "Family Room",
        img: "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=",
        address: "303 Suburb St, Familyville",
        price: 180,
        availability: "Available",
      },
      
  ];
  