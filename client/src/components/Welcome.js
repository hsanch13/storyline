import React from 'react';
import { useNavigate } from 'react-router-dom';


function Welcome() {
  const navigate = useNavigate();

return (
  <div className="welcome-container">
    <h1 className="display-4 mb-4">Welcome to Storyline!</h1>
    <div className="d-grid gap-2 col-6 mx-auto">
      <a 
        href="/view-all" 
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          navigate("/view-all");
        }}
      >
        <span>View all stories and sources</span>
      </a>
      <a 
        href="/add-story" 
        onClick={(e) => {
          e.preventDefault();
          navigate("/add-story");
        }}
      >
        <span>Add a new story</span>
      </a>
      <a 
        href="/add-source" 
        onClick={(e) => {
          e.preventDefault();
          navigate("/add-source");
        }}
      >
        <span>Add a new source</span>
      </a>
    </div>
  </div>
);

}  

export default Welcome;
