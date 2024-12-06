# Storyline  
**Phase 4 Project – Flatiron School – Cohort 09/16/2024**

---

## Overview  
**Storyline** is a full-stack application designed for journalists to manage story ideas, sources, and content effectively. Built with a **React frontend** and a **Flask backend**, it provides a simple and practical solution for organizing stories and linking them with relevant sources.

---

## Features  

### CRUD Functionality:  
- Full CRUD actions for stories and sources.  
- Create and read actions for all resources.  

### Data Validations:  
- Stories, content, and sources validated for specific formats and rules.  

### Client-Side Routing:  
- Three routes accessible via a navbar.  

### User Stories:  
- Add new story ideas or sources.  
- Update, edit, or delete stories and sources.  
- View detailed information for each story or source.  

### Stretch Goals:  
- Search stories by title or keyword.  
- Filter sources by role.  
- Manage deadlines and additional story details.  

---

## Technologies Used  

### Frontend:  
- **React** (with React Router for routing)  
- **Formik** for forms and validations  

### Backend:  
- **Flask** (with Flask-RESTful for API routes)  
- **Flask-SQLAlchemy** and **Flask-Migrate** for database management  

### Database:  
- **SQLite**  

### Other Tools:  
- **Fetch API** for communication between frontend and backend  

---

## Models and Relationships  

### Story:  
- **Attributes**: `id`, `title`, `topic`, `image`, `created_at`  
- **Relationships**: Has many content pieces, has many sources through `StorySource`  

### Content:  
- **Attributes**: `id`, `story_id`, `body`  
- **Relationships**: Belongs to a story  

### Source:  
- **Attributes**: `id`, `name`, `title`, `phone`, `email`  
- **Relationships**: Belongs to many stories through `StorySource`  

### StorySource (Association Model):  
- **Attributes**: `story_id`, `source_id`, `role`  
- **Relationships**: Links stories and sources  

---

## Application Pages  

### Welcome Page:  
- **Path**: `/`  
- **Description**: Displays buttons to create stories, add sources, or view all entries.  

### View All Stories and Sources:  
- **Path**: `/view-all`  
- **Description**: Displays a list of all stories and sources as expandable cards.  

### Individual Story Page:  
- **Path**: `/story/:id`  
- **Description**: Shows detailed information about a story. Includes edit and delete options.  

### Individual Source Page:  
- **Path**: `/source/:id`  
- **Description**: Shows detailed information about a source. Includes edit and delete options.  

### Forms:  
- **Add Story**: `/add-story`  
- **Add Source**: `/add-source`  
- **Edit Story**: `/story/:id/edit`  
- **Edit Source**: `/source/:id/edit`  

---

## Setup Instructions  

### Backend Setup  
1. Navigate to the server directory.  
2. Install dependencies:  
   ```bash
   pipenv install  
   pipenv shell  
3. Run Flask server:
   ```bash
   python server/app.py  

### Frontend Setup
1. Navigate to client directory
2. Install dependencies:
   ```bash
   npm install  
   npm start

### Database Setup
1. Initialize the database:
   ```bash
   flask db init
   flask db upgrade
2. Seed the database (optional):
   ```bash
   python server/seed.py  

### Future Enhancements
- Add search functionality for stories.
- Filter sources by role or other attributes.
- Manage deadlines and add multimedia content like photos or infographics to stories.

### Acknowledgements
Thanks so much to the Flatiron School instructors and my peers for guidance and support throughout this project. Luke, Matteo, Nolan, Alin, Guillermo. Thanks for being such a good baby, Ira, and thanks to my family for taking care of him during this project!
