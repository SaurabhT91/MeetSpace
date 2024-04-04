import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";


function RoomData() {

    const user = useSelector((state) => state.user);
    const [responseData, setResponseData] = useState({ campuses: [], rooms: [] });

    
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8000/api/bookMeetingRoom"
//         );
//         setResponseData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
    //   }, []);


    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Charges</th>
            <th>Campus</th>
            <th>Campus Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {responseData.rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room_name}</td>
              <td>{room.room_capacity}</td>
              <td>{room.room_charges}</td>
              <td>
                {
                  responseData.campuses.find(
                    (campus) => campus.id === room.campuses_id
                  )?.name
                }
              </td>
              <td>
                {
                  responseData.campuses.find(
                    (campus) => campus.id === room.campuses_id
                  )?.address
                }
              </td>
              <td>
                <button
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, roomId: room.id })
                  }
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}

export default RoomData;