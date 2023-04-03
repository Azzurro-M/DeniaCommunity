import React, { useState } from "react";

export const Attendees = ({
  attendees,
  handleAddAttendee,
  handleRemoveAttendee,
}) => {
  const [newAttendee, setNewAttendee] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newAttendee.trim() !== "") {
      handleAddAttendee(newAttendee);
      setNewAttendee("");
    }
  };

  return (
    <div>
      <h3>Attendees:</h3>
      <ul>
        {attendees.map((attendee, index) => (
          <li key={index}>
            {attendee}
            <button onClick={() => handleRemoveAttendee(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter attendee name"
          value={newAttendee}
          onChange={(event) => setNewAttendee(event.target.value)}
        />
        <button type="submit">Add Attendee</button>
      </form>
    </div>
  );
};
