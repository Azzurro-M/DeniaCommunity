import React, { useState } from "react";
// import { Attendees } from "./Attendees";
// import "../styles/create.css";

export const CreateEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [creator, setCreator] = useState("");
  const [contact, setContact] = useState("");
  const [attendees, setAttendees] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/event/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        date,
        time,
        location,
        creator,
        contact,
        attendees,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event created:", data);
        // TODO redirect to the newly created event's page or update your events list
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        // TODO display an error message to the user
      });

    // const handleAddAttendee = (newAttendee) => {
    //   setAttendees([...attendees, newAttendee]);
    // };
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>Create Your Event</h2>
      <div>
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="creator">Creator:</label>
        <input
          type="text"
          id="creator"
          value={creator}
          onChange={(event) => setCreator(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          required
        />
      </div>
      <button type="submit">Create Event</button>
      {/* <Attendees onAddAttendee={handleAddAttendee} /> */}
    </form>
  );
};
