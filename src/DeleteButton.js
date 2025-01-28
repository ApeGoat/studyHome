import React from "react";

export function DeleteButton({ handleDelete }) {
  return (
    <button className="delete" onClick={handleDelete}>
      ❌
    </button>
  );
}
