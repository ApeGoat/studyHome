import "./App.css";
import React from "react";
import { Logo } from "./Logo";
import { Tests } from "./Tests";
import { Sections } from "./Sections";
import { Topics } from "./Topics";
import { defaultTests } from "./defaultTests";
import { ImportButton } from "./ImportButton";
import { ExportButton } from "./ExportButton";

export default function App() {
  const [tests, setTests] = React.useState(defaultTests);
  const [activeTest, setActiveTest] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState(null);
  const activeTestObj = tests.find((test) => test.id === activeTest);
  const activeSectionObj = activeTestObj
    ? activeTestObj.sections.find((section) => section.id === activeSection)
    : null;

  function handleTestClick(testID) {
    setActiveTest(testID);
    setActiveSection(null);
  }
  function handleSectionClick(sectionID) {
    setActiveSection(sectionID);
  }
  function handleAddTest() {
    const newTest = {
      id: tests.length + 1,
      name: ``,
      sections: [],
    };
    setTests([...tests, newTest]);
  }
  function handleTestUpdate(newTest) {
    const updatedTests = tests.map((test) => {
      if (test.id === newTest.id) {
        return newTest;
      }
      return test;
    });
    setTests(updatedTests);
  }

  return (
    <div className="App">
      <Logo />
      <Tests
        tests={tests}
        setTests={setTests}
        handleClick={handleTestClick}
        activeTest={activeTest}
        activeSection={null}
        handleAddTest={handleAddTest}
        handleTestUpdate={handleTestUpdate}
      />
      {activeTestObj && (
        <Sections
          test={activeTestObj}
          handleClick={handleSectionClick}
          activeSection={activeSection}
          handleTestUpdate={handleTestUpdate}
        />
      )}
      {activeSectionObj && (
        <Topics
          test={activeTestObj}
          handleTestUpdate={handleTestUpdate}
          activeSection={activeSection}
        />
      )}
      <div className="footer">
        <h2>Data Export and Import Options</h2>
        <div className="file-buttons">
          <ExportButton tests={tests} />
          <ImportButton setTests={setTests} />
        </div>
      </div>
      <br />
      <div>
        <p style={{ fontSize: "14px" }}>
          Thank you for visiting my study app! I hope you find it usefull in
          your examination preparation. If you have any questions or feedback,
          here's my <a href="https://github.com/ApeGoat">Github</a>
        </p>
      </div>
    </div>
  );
}
