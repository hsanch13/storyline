import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="container text-center my-5">
      <h1 className="display-4 mb-4">Welcome to Storyline!</h1>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button 
          onClick={() => navigate("/view-all")} 
          className="btn btn-primary btn-lg">
          View all stories and sources
        </button>
        <button 
          onClick={() => navigate("/add-story")} 
          className="btn btn-success btn-lg">
          Add a new story
        </button>
        <button 
          onClick={() => navigate("/add-source")} 
          className="btn btn-warning btn-lg">
          Add a new source
        </button>
      </div>
    </div>
  );
}

export default Welcome;
