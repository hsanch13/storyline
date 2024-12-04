import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'


function ViewStory() {

    const [oneStory, setOneStory] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/stories/${id}`)
          .then(r => {
            if (r.ok){
                r.json().then(storyData => setOneStory(storyData))
            }
            else{
                r.json().then(errorObj => toast.error(errorObj.message || errorObj.error))
            }
          })
      }, [id])
      
      if (!oneStory){
        return <h2>Loading...</h2>
      }

  return (
    <div>
      
    </div>
  )
}

export default ViewStory
