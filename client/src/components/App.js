import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import ViewAll from "./ViewAll";
import AddStory from "./AddStory";
import AddSource from "./AddSource";
import AddStorySource from "./AddStorySource";

function App() {

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="nav-link">Welcome</Link>
          <Link to="/view-all" className="nav-link">View All</Link>
          <Link to="/add-story" className="nav-link">Add Story</Link>
          <Link to="/add-source" className="nav-link">Add Source</Link>
          <Link to="/add-story-source" className="nav-link">Add Story and Source</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/view-all" element={<ViewAll/>} />
          <Route path="/add-story" element={<AddStory/>} />
          <Route path="/add-source" element={<AddSource/>} />
          <Route path="/add-story-source" element={<AddStorySource/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;