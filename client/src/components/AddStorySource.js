// import React from 'react'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// function AddStorySource() {
//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       topic: '',
//       image: '',
//       sourceName: '',
//       sourceTitle: '',
//       sourcePhone: '',
//       sourceEmail: '',
//       role: '',
//     },
//     validationSchema: Yup.object({
//       title: Yup.string()
//         .max(60, 'Title must be 60 characters or less')
//         .required('Title is required'),
//       topic: Yup.string()
//         .oneOf(
//           [
//             "breaking news", "sports", "education", "justice",
//             "politics", "economy", "health", "environment",
//             "culture", "science", "crime", "human rights",
//             "faith and religion", "business", "technology"
//           ],
//           'Please select a valid topic'
//         )
//         .required('Topic is required'),
//       image: Yup.string().url('Must be a valid URL'),
//       sourceName: Yup.string()
//         .max(60, 'Name must be 60 characters or less')
//         .required('Source name is required'),
//       sourceTitle: Yup.string()
//         .max(60, 'Title must be 60 characters or less')
//         .required('Source title is required'),
//       sourcePhone: Yup.string()
//         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
//         .required('Phone number is required'),
//       sourceEmail: Yup.string()
//         .email('Invalid email address')
//         .required('Email is required'),
//       role: Yup.string()
//         .oneOf(
//           [
//             "expert", "educator", "witness", "analyst", "researcher",
//             "consultant", "spokesperson", "community leader", "advocate",
//             "victim", "politician", "background"
//           ],
//           'Please select a valid role'
//         )
//         .required('Role is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await fetch('/add-story-source', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//         });
//         if (response.ok) {
//           alert('Story and source created successfully!');
//           resetForm();
//         } else {
//           const errorData = await response.json();
//           alert(`Error: ${errorData.error}`);
//         }
//       } catch (error) {
//         alert('An unexpected error occurred.');
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <h2>Add Story and Source</h2>

//       <label htmlFor="title">Story Title</label>
//       <input
//         id="title"
//         name="title"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.title}
//       />
//       {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}

//       <label htmlFor="topic">Topic</label>
//       <select
//         id="topic"
//         name="topic"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.topic}
//       >
//         <option value="" label="Select a topic" />
//         {[
//           "breaking news", "sports", "education", "justice",
//           "politics", "economy", "health", "environment",
//           "culture", "science", "crime", "human rights",
//           "faith and religion", "business", "technology",
//         ].map((topic) => (
//           <option key={topic} value={topic}>
//             {topic}
//           </option>
//         ))}
//       </select>
//       {formik.touched.topic && formik.errors.topic ? <div>{formik.errors.topic}</div> : null}

//       <label htmlFor="image">Image URL</label>
//       <input
//         id="image"
//         name="image"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.image}
//       />
//       {formik.touched.image && formik.errors.image ? <div>{formik.errors.image}</div> : null}

//       <label htmlFor="sourceName">Source Name</label>
//       <input
//         id="sourceName"
//         name="sourceName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.sourceName}
//       />
//       {formik.touched.sourceName && formik.errors.sourceName ? <div>{formik.errors.sourceName}</div> : null}

//       <label htmlFor="sourceTitle">Source Title</label>
//       <input
//         id="sourceTitle"
//         name="sourceTitle"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.sourceTitle}
//       />
//       {formik.touched.sourceTitle && formik.errors.sourceTitle ? <div>{formik.errors.sourceTitle}</div> : null}

//       <label htmlFor="sourcePhone">Source Phone</label>
//       <input
//         id="sourcePhone"
//         name="sourcePhone"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.sourcePhone}
//       />
//       {formik.touched.sourcePhone && formik.errors.sourcePhone ? <div>{formik.errors.sourcePhone}</div> : null}

//       <label htmlFor="sourceEmail">Source Email</label>
//       <input
//         id="sourceEmail"
//         name="sourceEmail"
//         type="email"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.sourceEmail}
//       />
//       {formik.touched.sourceEmail && formik.errors.sourceEmail ? <div>{formik.errors.sourceEmail}</div> : null}

//       <label htmlFor="role">Source Role</label>
//       <select
//         id="role"
//         name="role"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.role}
//       >
//         <option value="" label="Select a role" />
//         {[
//           "expert", "educator", "witness", "analyst", "researcher",
//           "consultant", "spokesperson", "community leader", "advocate",
//           "victim", "politician", "background",
//         ].map((role) => (
//           <option key={role} value={role}>
//             {role}
//           </option>
//         ))}
//       </select>
//       {formik.touched.role && formik.errors.role ? <div>{formik.errors.role}</div> : null}

//       <button type="submit">Create Story with Source</button>
//     </form>
//   );
// }

// export default AddStorySource
