import React from "react";

function Filter({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Find contacts by name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Filter;
