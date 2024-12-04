import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddSource() {
  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      phone: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('Required'),
      title: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('Required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('/sources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) {
          throw new Error('Failed to create source');
        }
        alert('Source created successfully!');
      } catch (error) {
        console.error(error);
        alert('Error creating source. Please try again.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />
      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div>{formik.errors.phone}</div>
      ) : null}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Add Source</button>
    </form>
  )
}

export default AddSource
