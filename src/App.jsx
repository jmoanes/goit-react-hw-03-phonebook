import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import "./App.css"; // import CSS

// ✅ Default contacts
const DEFAULT_CONTACTS = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {
  // ✅ Load contacts from localStorage OR fallback to defaults
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      const parsed = JSON.parse(savedContacts);
      return parsed.length > 0 ? parsed : DEFAULT_CONTACTS;
    }
    return DEFAULT_CONTACTS;
  });

  const [filter, setFilter] = useState("");

  // ✅ Sync contacts with localStorage whenever they change
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
