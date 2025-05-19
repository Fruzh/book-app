📚 Book App

A web-based book management application for users with the student role. Built with Next.js (frontend) and AdonisJS (backend), storing data in MySQL. The app allows students to manage books, including adding, editing, and deleting book entries.
✨ Features

📖 Add, edit, view, and delete books with details like title, author, category, description, content, and cover image.
🔒 Restricted to users with the student role.
📸 Image upload support for book covers.
🔔 Real-time notifications for user actions.
📱 Responsive design for desktop and mobile.

🛠️ Tech Stack

Frontend: Next.js 14.2.15, React, Tailwind CSS
Backend: AdonisJS 6.0.0
Database: MySQL 8.0.39
Other: Formidable (file uploads), Nanoid (unique filenames)

📂 Project Structure
book-app/
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
Ensure you have the following installed:

Node.js (v18 or higher)
MySQL (v8.0 or higher)
Git
npm (comes with Node.js)

1. Clone the Repository
git clone https://github.com/Fruzh/book-app.git
cd book-app

2. Set Up the MySQL Database

Create a new database in MySQL (e.g., via phpMyAdmin or terminal):CREATE DATABASE book_app;


Ensure your MySQL server is running and accessible.

3. Configure and Run the Backend

Navigate to the backend folder:cd backend


Copy the environment file and configure it:cp .env.example .env

Edit .env with your MySQL credentials:DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DB_NAME=sesplus


Install dependencies:npm install


Run database migrations to create tables:node ace migration:run


Start the backend server:node ace serve --watch

🔗 Backend runs at: http://localhost:3333

4. Configure and Run the Frontend

Open a new terminal and navigate to the frontend folder:cd frontend


Create an environment file (if needed) for frontend configuration:touch .env.local

Example .env.local (optional, adjust as needed):NEXT_PUBLIC_API_URL=http://localhost:3333


Install dependencies:npm install


Start the frontend development server:npm run dev

🔗 Frontend runs at: http://localhost:3000

5. Access the App

Open your browser and visit http://localhost:3000.
Log in with a student role account (create one via the backend if needed).

🧪 Testing the App

Add a Book: Navigate to /books/add, fill out the form, and upload a cover image.
Edit a Book: Go to /books/[id], update details, and replace the cover image.
Delete a Book: Use the delete button on the edit page to remove a book.
Check the public/uploads/ folder for uploaded images and ensure old images are deleted on update.

🛠️ Troubleshooting

Database Connection Error:
Verify MySQL is running and credentials in .env are correct.
Check if the sesplus database exists.


Backend Not Starting:
Ensure port 3333 is free (lsof -i :3333 on Linux/Mac or netstat -a on Windows).
Run npm install again in the backend/ folder.


Frontend API Errors:
Confirm the backend is running at http://localhost:3333.
Check NEXT_PUBLIC_API_URL in .env.local.


Image Upload Issues:
Ensure public/uploads/ folder exists and is writable (chmod 775 public/uploads/ on Linux/Mac).
Verify uploaded files appear in public/uploads/.



📝 Notes

The app assumes a student role is defined in the backend. Check the AdonisJS authentication setup if roles are not working.
Image uploads are stored in frontend/public/uploads/. Ensure this folder is backed up if deploying to production.
For production, configure environment variables securely and use a reverse proxy (e.g., Nginx) for both frontend and backend.

🤝 Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

📜 License
This project is licensed under the MIT License.
📬 Contact
For issues or suggestions, open an issue on GitHub or contact the maintainer at fruzh@example.com.

Happy reading and coding! 📚🚀
