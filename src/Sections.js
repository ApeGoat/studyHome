import React from "react";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";

export function Sections({
  test,
  handleClick,
  activeSection,
  handleTestUpdate,
}) {
  const sections = test.sections;
  function handleAddSection() {
    const newSection = {
      id: sections.length + 1,
      name: "",
      topics: [],
    };
    const updatedSections = [...sections, newSection];
    handleTestUpdate({ ...test, sections: updatedSections });
  }

  return (
    <div className="section-nav-bar">
      {sections.map((section) => (
        <Section
          key={section.id}
          test={test}
          section={section}
          handleClick={handleClick}
          active={section.id === activeSection}
          handleTestUpdate={handleTestUpdate}
        />
      ))}
      <AddButton handleClick={handleAddSection} />
    </div>
  );
}
function Section({ test, section, handleClick, active, handleTestUpdate }) {
  const named = section.name === "";
  function handleNameChange(e) {
    section.name = e.target.value;
    const updatedSections = test.sections.map((s) => {
      if (s.id === section.id) {
        return section;
      }
      return s;
    });
    handleTestUpdate({ ...test, sections: updatedSections });
  }
  function handleDeleteSection() {
    const updatedSections = test.sections.filter((s) => s.id !== section.id);
    handleTestUpdate({ ...test, sections: updatedSections });
  }
  return (
    <div
      className={`section ${active ? "activeSection" : ""} ${
        named ? "unnamed" : ""
      }`}
      onClick={() => handleClick(section.id)}
      key={section.id}
    >
      {active ? (
        <>
          <h2>
            <input
              className="section-name"
              type="text"
              onChange={handleNameChange}
              value={section.name}
              placeholder="Enter Section Name"
            />
          </h2>
          <DeleteButton handleDelete={handleDeleteSection} />
        </>
      ) : (
        <h2>{section.name}</h2>
      )}
    </div>
  );
}
