// src/pages/ViewRoomsPage.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';

const ViewRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*'); // Adjust to select only the columns you need

      if (error) {
        console.error('Error fetching rooms:', error.message);
      } else {
        setRooms(data);
      }
      setLoading(false);
    };

    fetchRooms();
  }, []);

  const deleteRoom = async (roomId) => {
    const { data, error } = await supabase
      .from('rooms')
      .delete()
      .match({ room_id: roomId });

    if (error) {
      console.error('Error deleting room:', error.message);
    } else {
      setRooms(rooms.filter((room) => room.room_id !== roomId));
    }
  };

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div className='main'>
      <div className='header'>
        <h2>View Rooms</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Room Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.building_name}</td>
              <td><Link to={`/rooms/${room.room_id}`}>{room.room_number}</Link></td>
              <td>
                <button onClick={() => deleteRoom(room.room_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRoomsPage;
