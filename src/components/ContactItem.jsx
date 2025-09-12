import React from "react";

function ContactItem({ contact, onDelete }) {
  return (
    <li>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </li>
  );
}

export default ContactItem;
