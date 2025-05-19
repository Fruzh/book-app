📚 SESPlus Book App

A web-based book management application designed for users with the student role. Built with Next.js (frontend) and AdonisJS (backend), it stores data in MySQL. Students can add, edit, view, and delete books with details like title, author, category, description, content, and cover image.
✨ Features

📖 Manage books: Add, edit, view, and delete entries.
🔒 Access restricted to student role users.
📸 Upload and manage book cover images.
🔔 Real-time notifications for user actions.
📱 Responsive design for desktop and mobile.

🛠️ Tech Stack



Component
Technology



Frontend
Next.js 14.2.15, React, Tailwind CSS


Backend
AdonisJS 6.0.0


Database
MySQL 8.0.39


Other
Formidable (file uploads), Nanoid (unique filenames)


📂 Project Structure
sesplus-book-app/
├── backend/           # AdonisJS backend
│   ├── app/           # Controllers, models, validators
│   ├── database/      # Migrations and seeds
│   └── .env.example   # Environment configuration template
├── frontend/          # Next.js frontend
│   ├── src/           # Pages, components, API routes
│   ├── public/        # Static assets (e.g., uploads/)
│   └── .env.local     # Environment variables
└── README.md          # Project documentation

🚀 Getting Started
Prerequisites
Ensure the following are installed:



Tool
Version
Link



Node.js
v18 or higher
Download


MySQL
v8.0 or higher
Download


Git
Latest
Download


npm
Comes with Node.js
-


1. Clone the Repository
git clone https://github.com/Fruzh/sesplus-book-app.git
cd sesplus-book-app

2. Set Up the MySQL Database
Create a database named sesplus:
CREATE DATABASE sesplus;

Ensure your MySQL server is running.
3. Configure and Run the Backend

Navigate to the backend folder:cd backend


Copy and configure the environment file:cp .env.example .env

Edit .env with your MySQL credentials:DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DB_NAME=sesplus


Install dependencies:npm install


Run migrations to create tables:node ace migration:run


Start the backend server:node ace serve --watch

🔗 Backend: http://localhost:3333

4. Configure and Run the Frontend

Open a new terminal and navigate to the frontend folder:cd frontend


Create an environment file (optional):touch .env.local

Example .env.local:NEXT_PUBLIC_API_URL=http://localhost:3333


Install dependencies:npm install


Start the frontend server:npm run dev

🔗 Frontend: http://localhost:3000

5. Access the App
Visit http://localhost:3000 in your browser. Log in with a student role account (create one via the backend if needed).
🧪 Testing

Add a Book: Go to /books/add, complete the form, and upload a cover image.
Edit a Book: Visit /books/[id], update details, and replace the cover image.
Delete a Book: Use the delete button on the edit page.
Verify images in frontend/public/uploads/ and ensure old images are deleted on update.

🛠️ Troubleshooting

Database Connection Error:
Check MySQL is running and .env credentials are correct.
Confirm the sesplus database exists.


Backend Fails to Start:
Ensure port 3333 is free (lsof -i :3333 on Linux/Mac, netstat -a on Windows).
Re-run npm install in backend/.


Frontend API Errors:
Verify backend is running at http://localhost:3333.
Check NEXT_PUBLIC_API_URL in .env.local.


Image Upload Issues:
Ensure frontend/public/uploads/ exists and is writable (chmod 775 public/uploads/ on Linux/Mac).
Confirm uploaded files appear in public/uploads/.



📝 Notes

The student role must be configured in the AdonisJS backend. Check authentication setup if roles fail.
Images are stored in frontend/public/uploads/. Back up this folder for production.
For production, secure environment variables and use a reverse proxy (e.g., Nginx).
