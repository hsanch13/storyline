import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div 
      className="container-fluid" 
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", 
        backgroundSize: 'cover', 
        height: '100vh'
      }}
    >
      <div className="d-flex justify-content-center align-items-center h-100 text-center text-white">
        <div className="card p-5 shadow-lg bg-dark bg-opacity-50">
          <h1 className="display-4 mb-4 text-center">Welcome to Storyline!</h1>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button 
              onClick={() => navigate("/view-all")} 
              className="btn btn-primary btn-lg rounded-pill mb-3">
              <i className="fas fa-eye"></i> View all stories and sources
            </button>
            <button 
              onClick={() => navigate("/add-story")} 
              className="btn btn-success btn-lg rounded-pill mb-3">
              <i className="fas fa-plus-circle"></i> Add a new story
            </button>
            <button 
              onClick={() => navigate("/add-source")} 
              className="btn btn-warning btn-lg rounded-pill mb-3">
              <i className="fas fa-plus-square"></i> Add a new source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
