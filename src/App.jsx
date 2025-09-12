import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import "./App.css"; // ✅ import CSS

function App() {
  // ✅ Default contacts only
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  const addContact = (newContact) => {
    const exists = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (exists) {
      alert(`${newContact.name} is already in the contacts!`);
      return;
    }

    setContacts([...contacts, { ...newContact, id: crypto.randomUUID() }]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app">
      <div className="main-card">
        <h1 className="title">📞 Phonebook</h1>

        <div className="section">
          <ContactForm onAdd={addContact} />
        </div>

        <div className="section">
          <h2>Contacts</h2>
          <Filter value={filter} onChange={setFilter} />
        </div>

        <div className="section">
          <ContactList contacts={filteredContacts} onDelete={deleteContact} />
        </div>
      </div>
    </div>
  );
}

export default App;
