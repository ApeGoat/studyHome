import React from "react";

export function AddButton({ handleClick }) {
  return (
    <div className="add-button" onClick={handleClick}>
      <h2>➕</h2>
    </div>
  );
}
