import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import "./App.css"; // ✅ import CSS

function App() {
  // ✅ Load contacts from localStorage on first render
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [filter, setFilter] = useState("");

  // ✅ Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
    setContacts(contacts.filter((contact) => contact.id !== id));
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
