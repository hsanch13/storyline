import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function ViewSource({ onDelete }) {

    const [oneSource, setOneSource] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate ()

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/sources/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(sourceData => setOneSource(sourceData))
                } else {
                    r.json().then(errorObj => {
                        toast.error(errorObj.message || errorObj.error)
                        navigate("/view-all")
                })
                }
            })
    }, [id])

    if (!oneSource) {
        return <h2>Loading...</h2>;
    }

    const handleDelete = () => {
        if (!oneSource || !oneSource.id) {
            toast.error("Source data is not loaded yet.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this source?")) {
            onDelete(oneSource.id).then((successFlag) => successFlag ? navigate("/view-all"): null);
        }
    };

    const handleUpdate = () => {
        navigate(`/sources/${oneSource.id}/edit`)
    };

    return (
        <div>
            <h2>{oneSource.name}</h2>
            <h3></h3>
            <p>Phone: {oneSource.phone}</p>
            <p>Email: {oneSource.email}</p>
            <button onClick={handleUpdate}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default ViewSource;