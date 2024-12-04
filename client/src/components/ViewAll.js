import React from 'react'
import { useEffect, useState } from "react";

function ViewAll() {
  
    const [sources, setSources] = useState([])
    const [stories, setStories] = useState([])
    
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

  return (
    <div>
      <h2>All Stories</h2>
        <ul>
          <p>{stories.map((story) => <li key={story.id}>{story.title}</li>)}</p>
        </ul>
      <h2>All Sources</h2>
        <ul>
          <p>{sources.map((source) => <li key={source.id}>{source.name}</li>)}</p>          
        </ul>
    </div>
  )
}

export default ViewAll
