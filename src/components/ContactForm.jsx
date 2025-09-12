import React, { useState } from "react";

function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !number.trim()) {
      alert("Please enter both name and phone number");
      return;
    }

    onAdd({ name, number });
    setName("");
    setNumber("");
  };

  // ✅ Format as XXX-XX-XX-X
  const formatNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, ""); // remove non-numeric

    const part1 = onlyNumbers.substring(0, 3);
    const part2 = onlyNumbers.substring(3, 5);
    const part3 = onlyNumbers.substring(5, 7);
    const part4 = onlyNumbers.substring(7, 8);

    let formatted = part1;
    if (part2) formatted += `-${part2}`;
    if (part3) formatted += `-${part3}`;
    if (part4) formatted += `-${part4}`;

    return formatted;
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(formatNumber(e.target.value))}
        maxLength={9} // XXX-XX-XX-X is 10 characters
        required
      />

      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
