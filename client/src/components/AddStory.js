import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddStory() {
  const formik = useFormik({
    initialValues: {
      title: '',
      topic: '',
      image: '',
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
        const response = await fetch('/stories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const newStory = await response.json();
          alert('Story created successfully!');
          resetForm();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        alert('An unexpected error occurred.');
      }
    },
  });

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

      <button type="submit">Create Story</button>
    </form>
  );
}

export default AddStory
