import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import toast from 'react-hot-toast'
// import { useState } from "react";
import Welcome from "./Welcome";
import ViewAll from "./ViewAll";
import AddStory from "./AddStory";
import AddSource from "./AddSource";
import ViewStory from "./ViewStory";
import ViewSource from "./ViewSource";
import * as Yup from "yup"
import { Filter } from "bad-words"
import EditStory from "./EditStory";
import EditSource from "./EditSource";

function App() {
  // const [stories, setStories] = useState([]);
  // const [sources, setSources] = useState([]);

  const filter = new Filter(); // need this for filtering bad-words pkg

  ///validating story attributes -- title for length/profanity, req. topic list,
  const storySchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(60, "Title cannot exceed 60 characters")
      .test(
        "no-profanity",
        "Title contains inappropriate language",
        (value) => {
          if (value && filter.isProfane(value)) {
            return false; // Fail validation if profanity is found
          }
          return true; // Pass validation if no profanity
        }
      ),
    topic: Yup.string()
      .required("Topic is required")
      .oneOf(
        [
          "breaking news",
          "sports",
          "education",
          "justice",
          "politics",
          "economy",
          "health",
          "environment",
          "culture",
          "science",
          "crime",
          "human rights",
          "faith and religion",
          "business",
          "technology",
        ],
        "Topic is not valid"
      ),
  });

  ///validating source attributes -- name & title for length/profanity, email and phone
  const sourceSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(60, "Name must be between 1 and 60 characters")
      .test("no-profanity", "Name contains inappropriate language", (value) => {
        if (value && filter.isProfane(value)) {
          return false; // fail validation if profanity is found
        }
        return true; // pass validation if no profanity
      }),

    title: Yup.string()
      .required("Title is required")
      .max(60, "Title must be between 1 and 60 characters")
      .test("no-profanity", "Title contains inappropriate language", (value) => {
        if (value && filter.isProfane(value)) {
          return false; // fail validation if profanity is found
        }
        return true; // pass validation if no profanity
      }),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .test("unique-phone", "Phone number already exists", async (value) => {
        const response = await fetch(`http://localhost:5555/sources?phone=${value}`);
        const data = await response.json();
        return data.length === 0; // Checking if phone number already exists in db
      }),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .test("unique-email", "Email already exists", async (value) => {
        const response = await fetch(`http://localhost:5555/sources?email=${value}`);
        const data = await response.json();
        return data.length === 0; // Checking if email already exists in db
      }),
  });

  ///deletes a story
  const deleteStory = (id) => {
    return fetch(`/stories/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          toast.success("Story deleted successfully");
          return true
        } else {
          toast.error("Failed to delete story");
          return false
        }
      })
      .catch((error) => {
        console.error("Error deleting story:", error);
        toast.error("An error occurred while deleting the story");
      });
  };

  ///deletes a source
  const deleteSource = (id) => {
    return fetch(`/sources/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          toast.success("Source deleted successfully");
          return true
        } else {
          toast.error("Failed to delete source");
          return false
        }
      })
      .catch((error) => {
        console.error("Error deleting source:", error);
        toast.error("An error occurred while deleting the source");
      });
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="nav-link">Welcome</Link>
          <Link to="/view-all" className="nav-link">View All</Link>
          <Link to="/add-story" className="nav-link">Add Story</Link>
          <Link to="/add-source" className="nav-link">Add Source</Link>
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
              />
            }
          />
          <Route
            path="/source/:id"
            element={
              <ViewSource
                onDelete={deleteSource}
              />
            }
          />
          <Route
            path="/stories/:id/edit"
            element={
              <EditStory 
              />
            }
          />
          <Route
            path="/sources/:id/edit"
            element={
              <EditSource 
              />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App;