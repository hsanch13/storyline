import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewAll() {
  const [sources, setSources] = useState([]);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5555/sources")
      .then((r) => r.json())
      .then((sourceData) => setSources(sourceData));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/stories")
      .then((r) => r.json())
      .then((storyData) => setStories(storyData));
  }, []);

  return (
    <div>
      <h2>All Stories</h2>
      <div className="card-grid">
        {stories.map((story) => (
          <div
            key={story.id}
            className="cardcontainer"
            onClick={() => navigate(`/story/${story.id}`)}
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
                  e.stopPropagation(); // prevents card's click event
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
      <div className="card-grid">
        {sources.map((source) => (
          <div key={source.id} className="service-block-two">
            <div className="inner-box">
              <div className="icon-box">📖</div>
              <h5>{source.name}</h5>
              <p className="text">{source.title}</p>
            <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation(); // prevents card's click event
                  navigate(`/source/${source.id}`);
                }}
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAll;
