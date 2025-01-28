import React from "react";

export function ExportButton({ tests }) {
  function updateTestFile() {
    let data = JSON.stringify(tests);
    let blob = new Blob([data], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "tests.json";
    a.click();
  }
  return (
    <button className="export" onClick={updateTestFile}>
      <h4>Click Here to Download Data</h4>
    </button>
  );
}
