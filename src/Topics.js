import React from "react";
import { DeleteButton } from "./DeleteButton";

export function Topics({ test, handleTestUpdate, activeSection }) {
  const section = test.sections.find((section) => section.id === activeSection);
  const topics = section.topics;
  const [newTopic, setNewTopic] = React.useState({
    name: "",
    linkToSlides: "",
    suggestedProblems: [],
  });
  function handleNameChange(e) {
    setNewTopic({ ...newTopic, name: e.target.value });
  }
  function handleLinkChange(e) {
    setNewTopic({ ...newTopic, linkToSlides: e.target.value });
  }
  function handleProblemsChange(e) {
    const problemsArray = e.target.value
      .split(",")
      .map((problem) => problem.trim());
    setNewTopic({ ...newTopic, suggestedProblems: problemsArray });
  }
  function handleNewTopic(e) {
    e.preventDefault();
    section.topics.push(newTopic);
    const updatedSections = test.sections.map((s) => {
      if (s.id === section.id) {
        return section;
      }
      return s;
    });
    handleTestUpdate({ ...test, sections: updatedSections });
  }
  function handleDeleteTopic(topic) {
    const updatedTopics = section.topics.filter((t) => t.name !== topic.name);
    section.topics = updatedTopics;
    const updatedSections = test.sections.map((s) => {
      if (s.id === section.id) {
        return section;
      }
      return s;
    });
    handleTestUpdate({ ...test, sections: updatedSections });
  }
  return (
    <div
      className="topics"
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      {topics.map((topic) => (
        <Topic
          key={topic.name}
          topic={topic}
          handleDeleteTopic={handleDeleteTopic}
        />
      ))}
      <div className="new-topic">
        <form
          onSubmit={handleNewTopic}
          style={{ display: "flex", flexDirection: "row", width: "80%" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              padding: "5%",
            }}
          >
            <h4>
              <label>Topic Name:</label>
            </h4>
            <input
              key="name"
              type="text"
              placeholder="Enter Topic Name"
              value={newTopic.name}
              onChange={handleNameChange}
              style={{ width: "100%" }}
            />
            <h4>
              <label>Link to Slides:</label>
            </h4>
            <input
              name="linkToSlides"
              type="text"
              placeholder="Type or Paste Link"
              value={newTopic.linkToSlides}
              onChange={handleLinkChange}
              style={{ width: "100%" }}
            />
            <h4>
              <label>Suggested Problems:</label>
            </h4>
            <input
              name="suggestedProblems"
              type="text"
              placeholder="Separate Problems by Commas"
              value={newTopic.suggestedProblems}
              onChange={handleProblemsChange}
              style={{ width: "100%" }}
            />
          </div>
          <button
            className="add-button"
            type="submit"
            style={{
              height: "10%",
              width: "8%",
              alignSelf: "center",
              borderRadius: "0.9rem",
              fontSize: "2.3rem",
              flexGrow: 0,
            }}
          >
            ➕
          </button>
        </form>
      </div>
    </div>
  );
}
function Topic({ topic, handleDeleteTopic }) {
  function handleDelete() {
    handleDeleteTopic(topic);
  }
  return (
    <div className="topic">
      <input type="checkbox" style={{ width: "1%" }} />
      <h3>{topic.name}</h3>
      <h4
        onMouseEnter={(e) => {
          e.target.nextSibling.style.display = "block";
        }}
        onMouseLeave={(e) => {
          e.target.nextSibling.style.display = "none";
        }}
      >
        Suggested Problems
      </h4>
      <span className="suggested-problems">
        {topic.suggestedProblems.map((problem) => (
          <p key={problem}>{problem}</p>
        ))}
      </span>
      <a href={topic.linkToSlides}>Slides</a>
      <DeleteButton handleDelete={handleDelete} />
    </div>
  );
}
