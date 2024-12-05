import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function EditStory() {

  const {id} = useParams()
  const [selectedStory, setSelectedStory] = useState(null)

  const formik = useFormik({
    initialValues: {
      title: selectedStory?.title || "",
      topic: selectedStory?.topic || "",
      image: selectedStory?.image || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(60, 'Title must be 60 characters or less')
        .required('Title is required'),
      topic: Yup.string()
        .oneOf(
          [
            "breaking news", "sports", "education", "justice", 
            "politics", "economy", "health", "environment", 
            "culture", "science", "crime", "human rights", 
            "faith and religion", "business", "technology"
          ],
          'Please select a valid topic'
        )
        .required('Topic is required'),
      image: Yup.string().url('Must be a valid URL'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`/stories/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const editedStory = await response.json(); //patched story
          toast.success('Story created successfully!');
          setSelectedStory(editedStory)
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.error}`);
        }
      } catch (error) {
        toast.error('An unexpected error occurred.');
      }
    },
  });

  useEffect(() => {
    fetch(`/stories/${id}`) // using proxy route; without proxy we need to use CORS 
      .then((r) => {
        if (!r.ok){
          r.json().then(errorObj => toast.error(errorObj.error)) 
        } else {
          r.json().then(data => {
            setSelectedStory(data)
            formik.setValues({
              title: data.title,
              topic: data.topic,
              image: data.image,
            },)
          }) // shortcut instead of saying data => setData
            
        }
      })
  }, [id]);

  if (!selectedStory) return <h2>Loading...</h2> //takes care of delay for form to populate

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}

      <label htmlFor="topic">Topic</label>
      <select
        id="topic"
        name="topic"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.topic}
      >
        <option value="" label="Select a topic" />
        {[
          "breaking news", "sports", "education", "justice", 
          "politics", "economy", "health", "environment", 
          "culture", "science", "crime", "human rights", 
          "faith and religion", "business", "technology",
        ].map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      {formik.touched.topic && formik.errors.topic ? <div>{formik.errors.topic}</div> : null}

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        name="image"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}
      />
      {formik.touched.image && formik.errors.image ? <div>{formik.errors.image}</div> : null}

      <button type="submit">Update Story</button>
    </form>
  );
}

export default EditStory
