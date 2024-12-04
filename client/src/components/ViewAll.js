import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ViewAll() {

  const [sources, setSources] = useState([])
  const [stories, setStories] = useState([])
  const navigate = useNavigate();

  // add .catch inside first .then, ask if resp is ok
  useEffect(() => {
    fetch("http://127.0.0.1:5555/sources")
      .then(r => r.json())
      .then(sourceData => setSources(sourceData))
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:5555/stories")
      .then(r => r.json())
      .then(storyData => setStories(storyData))
  }, [])

  // delete a story
  const deleteStory = (id) => {
    fetch(`http://localhost:5555/stories/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setStories(stories.filter((story) => story.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting story:", error));
  };

  // update a story
  const updateStory = (id, updatedData) => {
    fetch(`http://localhost:5555/stories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedStory) => {
        setStories(
          stories.map((story) => (story.id === id ? updatedStory : story))
        );
      })
      .catch((error) => console.error("Error updating story:", error));
  };

  return (
    <div>
      <h2>All Stories</h2>
      <div className="card-grid">
        {stories.map((story) => (
          <div
            key={story.id}
            className="cardcontainer"
            onClick={() => navigate(`/story/${story.id}`)}
            style={{ cursor: "pointer" }}
            story={story}
            onDelete={deleteStory}
            onUpdate={updateStory}
          >
            <div className="photo">
              <img src={story.image} alt={story.title} />
            </div>
            <div className="content">
              <div className="txt1">{story.title}</div>
              <div className="txt2">{story.topic}</div>
            </div>
            <div className="footer">
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering card's click event
                  navigate(`/story/${story.id}`);
                }}
              >
                View Story
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2>All Sources</h2>
      <ul>
        <p>{sources.map((source) => <li key={source.id}>{source.name}</li>)}</p>
      </ul>
    </div>
  )
}

export default ViewAll
