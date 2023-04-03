import React, { useState, useEffect } from "react";
import axios from "axios";
// import Attendees from "./Attendees";
// import "@/styles/eventList.css";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get("http://localhost:5000/api/event");
      setEvents(data);
      setLoading(false);
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
      <h1>DENIA COMMUNITY BOARD</h1>
      <h3>Create your Event or Join one now! </h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.name}</h2>
            <div>{event.image}</div>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>{event.location}</p>
            <p>{event.creator}</p>
            <p>{event.contact}</p>
            {/* <Attendees attendees={event.attendees} /> */}
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
