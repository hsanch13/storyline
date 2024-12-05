import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

function ViewStory({ onDelete, onUpdate }) {

    const [oneStory, setOneStory] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/stories/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(storyData => setOneStory(storyData))
                } else {
                    r.json().then(errorObj => toast.error(errorObj.message || errorObj.error))
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
            onDelete(oneStory.id);
        }
    };

    const handleUpdate = () => {
        const updatedTitle = prompt("Enter new title:", oneStory.title);
        const updatedTopic = prompt("Enter new topic:", oneStory.topic);
        const updatedImage = prompt("Enter new image URL:", oneStory.image);
    
        if (updatedTitle && updatedTopic && updatedImage) {
            const updatedData = {
                title: updatedTitle,
                topic: updatedTopic,
                image: updatedImage,
            };
    
            onUpdate(oneStory.id, updatedData);
            setOneStory((prevStory) => ({ ...prevStory, ...updatedData }));
        }
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
