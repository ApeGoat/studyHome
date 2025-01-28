import React from "react";

export function ImportButton({ setTests }) {
  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setTests(JSON.parse(content));
    };
    reader.readAsText(file);
  }
  return (
    <div className="import-container">
      <input className="import" type="file" onChange={handleFileChange} />
    </div>
  );
}
