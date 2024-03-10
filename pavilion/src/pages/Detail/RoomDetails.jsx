// src/pages/RoomDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const RoomDetailsPage = () => {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams(); // Get the room ID from the URL params

  useEffect(() => {
    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_id', roomId) // Use the room_id to fetch the specific room
        .single(); // Expecting only one result

      if (error) {
        console.error('Error fetching room details:', error.message);
      } else {
        setRoom(data);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (!room) {
    return <div>Loading room details...</div>;
  }

  return (
    <div className='main'>
      <div className="header">
        <h2>Room Details</h2>
      </div>
      <h2>Room Details</h2>
      <div>Room ID: {room.room_id}</div>
      <div>Building Name: {room.building_name}</div>
      <div>Floor Number: {room.floor_number}</div>
      <div>Room Number: {room.room_number}</div>
    </div>
  );
};

export default RoomDetailsPage;
