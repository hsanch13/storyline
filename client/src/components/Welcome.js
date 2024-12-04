import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {

  const navigate = useNavigate()

  return (
    <div>
      <h1>Welcome to Storyline!</h1>
        <button onClick={() => navigate("/view-all")}>View all stories and sources</button>
        {/* <button onClick={() => navigate("/add-story-source")}>Add a new story and source</button> */}
        <button onClick={() => navigate("/add-story")}>Add a new story</button>
        <button onClick={() => navigate("/add-source")}>Add a new source</button>
    </div>
  )
}

export default Welcome
