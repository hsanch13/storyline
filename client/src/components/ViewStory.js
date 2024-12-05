import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function ViewStory({ onDelete }) {

    const [oneStory, setOneStory] = useState(null)

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/stories/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(storyData => setOneStory(storyData))
                } else {
                    r.json().then(errorObj => {
                        toast.error(errorObj.message || errorObj.error)
                        navigate("/view-all")
                })
                }
            })
    }, [id])

    if (!oneStory) {
        return <h2>Loading...</h2>
    }

    const handleDelete = () => {
        if (!oneStory || !oneStory.id) {
            toast.error("Story data is not loaded yet.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this story?")) {
            onDelete(oneStory.id).then((successFlag) => successFlag ? navigate("/view-all"): null);
        }
    };

    const handleUpdate = () => {
        navigate(`/stories/${oneStory.id}/edit`)
    };
    
    return (
        <div>
            <h2>{oneStory.title}</h2>
            {oneStory.image && <img src={oneStory.image} alt={oneStory.title} />}
            <h3>Story:</h3>
            {oneStory.content && oneStory.content.length > 0 ? (
                oneStory.content.map((contentItem) => (
                    <p key={contentItem.id}>{contentItem.body}</p>
                ))
            ) : (
                <p>No content available for this story.</p>
            )}
            <button onClick={handleUpdate}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>


    )
}

export default ViewStory
