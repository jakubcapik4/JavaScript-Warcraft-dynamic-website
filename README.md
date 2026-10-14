# Warcraft Dynamic Website

A dynamic World of Warcraft-themed website built with **Node.js, Express, EJS, JavaScript, CSS and MySQL**.

## About the Project

This project was developed as a university semester project focused on dynamic web development. It demonstrates server-side web development, database integration, user authentication and dynamic page rendering.

The website uses a World of Warcraft-inspired theme to present information and interactive features.

## Features

- Dynamic web pages rendered using EJS templates
- User registration and login
- Session management and authentication
- Administrative section for user management
- Job listings and related functionality
- Subscription-related functionality
- Reviews and database operations
- Responsive page styling and client-side JavaScript
- MySQL database integration

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web application framework
- **EJS** – Server-side HTML templating
- **MySQL** – Relational database
- **mysql2** – MySQL client for Node.js
- **express-session** – Session management
- **bcryptjs** – Password hashing
- **HTML, CSS and JavaScript** – Front-end structure, styling and interactivity

## Project Structure

```text
warcraft-dynamic-website/
├── controllers/       # Application logic
├── data/              # Database configuration and JSON data
├── middlewares/       # Authentication and request middleware
├── models/            # Data models
├── public/
│   ├── images/        # Website images
│   ├── scripts/       # Client-side JavaScript
│   └── styles/        # CSS stylesheets
├── routes/            # Application routes
├── util/              # Database initialization and utilities
├── views/             # EJS templates
├── app.js             # Application entry point
├── seedAdmin.js       # Administrative account initialization script
├── package.json       # Project dependencies and scripts
└── package-lock.json  # Locked dependency versions
```

## Requirements

To run the project locally, you need:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- MySQL Server

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/warcraft-dynamic-website.git
cd warcraft-dynamic-website
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Install dependencies

```
npm install
```

### 3. Configure MySQL

Create a MySQL database named `career_portal`.

Check the database connection settings in:

- `data/database.js`
- `app.js`

Update the host, port, username and password to match your local MySQL configuration.

The application includes database initialization logic that creates the required tables when they do not exist.

### 4. Start the application

```
npm start
```

The application uses port `3001` by default.

Open the following address in your browser:

```text
http://localhost:3001
```

## Test Administrator Account

The source code contains example administrator credentials for local testing:

- **Email:** `admin@example.com`
- **Password:** `adminpass`

These credentials are intended for local development only. The administrator initialization script may modify the user record with ID `1`, so review the script before running it.

## Notes

- This is an educational project and has not been fully verified in a clean installation environment.
- A running MySQL server and a correctly configured database connection are required.
- The repository contains the application source code, not a complete database backup.
- Some features may require additional configuration or testing.
- Do not use the example credentials or development configuration in a production environment.

## Author

**Jakub Capík**

University semester project – Dynamic Web Development.

## Disclaimer

This is an unofficial, educational project inspired by the World of Warcraft universe. World of Warcraft and related trademarks and assets belong to their respective owners.
