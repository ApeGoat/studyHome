import React from "react";
import { AddButton } from "./AddButton";
import { DeleteButton } from "./DeleteButton";

export function Tests({
  tests,
  setTests,
  handleClick,
  activeTest,
  handleAddTest,
  handleTestUpdate,
}) {
  return (
    <>
      <div className="test-nav-bar">
        {tests.map((test) => (
          <Test
            key={test.id}
            test={test}
            tests={tests}
            setTests={setTests}
            handleClick={handleClick}
            active={test.id === activeTest}
            handleTestUpdate={handleTestUpdate}
          />
        ))}
        <AddButton handleClick={handleAddTest} />
      </div>
    </>
  );
}
function Test({
  test,
  tests,
  setTests,
  handleClick,
  active,
  handleTestUpdate,
}) {
  function handleNameChange(e) {
    handleTestUpdate({ ...test, name: e.target.value });
  }
  function handleDeleteTest() {
    const updatedTests = tests.filter((t) => t.id !== test.id);
    setTests(updatedTests);
  }
  return (
    <>
      <div
        onClick={() => handleClick(test.id)}
        className={`test ${active ? "activeTest" : ""}`}
      >
        {active ? (
          <>
            <h1>
              <input
                className="test-name"
                type="text"
                onChange={handleNameChange}
                value={test.name}
                placeholder="Enter Test Name"
              />
            </h1>
            <DeleteButton handleDelete={handleDeleteTest} />
          </>
        ) : (
          <h1>{test.name}</h1>
        )}
      </div>
    </>
  );
}
