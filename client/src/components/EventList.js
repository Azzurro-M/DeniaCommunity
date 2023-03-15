import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/eventList.css";

export const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get("http://localhost:5000/api/event");
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/delete/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="event-list">
      <h1>DENIA COMMUNITY</h1>
      <h3>Create your Event or Join one now! </h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.location}</p>
            <p>{event.creator}</p>
            <p>{event.contact}</p>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
