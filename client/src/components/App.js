import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import toast from 'react-hot-toast'
import { useState } from "react";
import Welcome from "./Welcome";
import ViewAll from "./ViewAll";
import AddStory from "./AddStory";
import AddSource from "./AddSource";
import ViewStory from "./ViewStory";
import ViewSource from "./ViewSource";

function App() {
  const [stories, setStories] = useState([]);

  const [sources, setSources] = useState([]);

  // const navigate = useNavigate()

  //deletes a story
  const deleteStory = (id) => {
    fetch(`http://localhost:5555/stories/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setStories(stories.filter((story) => story.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting story:", error));
  };

  //updates a story
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
        setStories((prevStories) =>
          prevStories.map((story) =>
            story.id === id ? updatedStory : story
          )
        );
      })
      .catch((error) => console.error("Error updating story:", error));
  };

  //deletes a source
  const deleteSource = (id) => {

    fetch(`http://127.0.0.1:5555/sources/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setSources((prevSources) =>
            prevSources.filter((source) => source.id !== id)
          );
          toast.success("Source deleted successfully");
        } else {
          toast.error("Failed to delete source");
        }
      })
      .catch(() => toast.error("An error occurred while deleting the source"));
  };

  // Updates a source
  const updateSource = (id, updatedData) => {
    fetch(`http://127.0.0.1:5555/sources/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((r) => r.json())
      .then((updatedSource) => {
        setSources((prevSources) =>
          prevSources.map((source) =>
            source.id === id ? updatedSource : source
          )
        );
        toast.success("Source updated successfully");
      })
      .catch(() => toast.error("An error occurred while updating the source"));
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="nav-link">Welcome</Link>
          <Link to="/view-all" className="nav-link">View All</Link>
          <Link to="/add-story" className="nav-link">Add Story</Link>
          <Link to="/add-source" className="nav-link">Add Source</Link>
          {/* <Link to="/add-story-source" className="nav-link">Add Story and Source</Link> */}
        </nav>
        <Toaster />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/view-all" element={<ViewAll />} />
          <Route path="/add-story" element={<AddStory />} />
          <Route path="/add-source" element={<AddSource />} />
          <Route
            path="/story/:id"
            element={
              <ViewStory
                onDelete={deleteStory}
                onUpdate={updateStory}
              />
            }
          />
          <Route
            path="/source/:id"
            element={
              <ViewSource
                onDelete={deleteSource}
                onUpdate={updateSource}
              />
            }
          />
          {/* <Route path="/add-story-source" element={<AddStorySource/>} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;