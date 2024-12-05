import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function ViewSource({ onDelete, onUpdate }) {
    const [oneSource, setOneSource] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/sources/${id}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((sourceData) => setOneSource(sourceData));
                } else {
                    r.json().then((errorObj) => toast.error(errorObj.message || errorObj.error));
                }
            })
            .catch(() => toast.error('Failed to fetch source data.'));
    }, [id]);

    if (!oneSource) {
        return <h2>Loading...</h2>;
    }

    const handleDelete = () => {
        if (!oneSource || !oneSource.id) {
            toast.error("Source data is not loaded yet.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this source?")) {
            onDelete(oneSource.id);
        }
    };

    const handleUpdate = () => {
        const updatedName = prompt("Enter new name:", oneSource.name);
        const updatedTitle = prompt("Enter new title:", oneSource.title);
        const updatedPhone = prompt("Enter new phone:", oneSource.phone);
        const updatedEmail = prompt("Enter new email:", oneSource.email);

        if (updatedName && updatedTitle && updatedPhone && updatedEmail) {
            const updatedData = {
                name: updatedName,
                title: updatedTitle,
                phone: updatedPhone,
                email: updatedEmail,
            };

            onUpdate(oneSource.id, updatedData);
            setOneSource((prevSource) => ({ ...prevSource, ...updatedData }));
        }
    };

    return (
        <div>
            <h2>{oneSource.name}</h2>
            <h3>Title: {oneSource.title}</h3>
            <p>Phone: {oneSource.phone}</p>
            <p>Email: {oneSource.email}</p>
            <button onClick={handleUpdate}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default ViewSource;