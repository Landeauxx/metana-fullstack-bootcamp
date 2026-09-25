# Module 8 - Full-Stack Portfolio

A full-stack portfolio application built with React, Node.js, Express, and PostgreSQL.

This project expands on my Module 7 portfolio design by converting it into a React application and connecting it to a PostgreSQL-backed REST API.

## Features

- Responsive portfolio interface
- React Router navigation
- Reusable React components
- Portfolio project filtering
- About and skills sections
- Contact form interface
- Blog posts loaded from PostgreSQL
- Individual blog detail pages
- Admin dashboard interface
- Custom 404 page
- Express REST API
- PostgreSQL database integration
- Production React build served through Express

## Tech Stack

### Frontend

- React
- React Router
- Axios
- React Icons
- CSS
- Create React App

### Backend

- Node.js
- Express
- PostgreSQL
- `pg`
- dotenv
- Morgan
- CORS

## Project Structure

```text
module-8/
├── client/
│   ├── public/
│   │   └── assets/
│   │       └── images/
│   └── src/
│       ├── api/
│       │   └── blogs.js
│       ├── components/
│       │   ├── AboutSection.jsx
│       │   ├── BlogCard.jsx
│       │   ├── Footer.jsx
│       │   ├── Header.jsx
│       │   ├── Layout.jsx
│       │   ├── Navigation.jsx
│       │   ├── ProjectCard.jsx
│       │   ├── ProjectsSection.jsx
│       │   └── ServiceCard.jsx
│       ├── pages/
│       │   ├── About.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── Blogs.jsx
│       │   ├── Contact.jsx
│       │   ├── Home.jsx
│       │   ├── NotFound.jsx
│       │   ├── Projects.jsx
│       │   └── SingleBlog.jsx
│       ├── App.css
│       ├── App.js
│       └── setupProxy.js
│
└── server/
    ├── db/
    ├── routes/
    ├── scripts/
    ├── config.js
    ├── index.js
    └── package.json