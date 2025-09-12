import React, { useState } from "react";

function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || number.trim() === "") return;

    onAdd({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;
