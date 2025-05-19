
# 📚 Book App

**A web-based book management application for students**  
Built with **Next.js** (frontend) and **AdonisJS** (backend), using **MySQL** for data storage.



## ✨ Features

- 📖 **Add, edit, view, and delete books** with details like:
  - Title
  - Author
  - Category
  - Description
  - Content
  - Cover Image
- 🔒 **Access restricted to student role users**
- 📸 **Image upload support** for book covers
- 🔔 **Real-time notifications** on user actions
- 📱 **Responsive design** for desktop and mobile



## 🛠️ Tech Stack

| Layer       | Technology                |
|-------------|----------------------------|
| Frontend    | Next.js 14.2.15, React, Tailwind CSS |
| Backend     | AdonisJS 6.0.0             |
| Database    | MySQL 8.0.39               |
| Utilities   | Formidable (file uploads), Nanoid (unique filenames) |



## 📂 Project Structure

```
book-app/
├── backend/           # AdonisJS backend
│   ├── app/           # Controllers, models, validators
│   ├── database/      # Migrations and seeds
│   └── .env.example   # Environment config template
├── frontend/          # Next.js frontend
│   ├── src/           # Pages, components, API routes
│   ├── public/        # Static assets (e.g., uploads/)
│   └── .env.local     # Environment variables
└── README.md          # Project documentation

```

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Git
- npm (comes with Node.js)



### 🧾 1. Clone the Repository

```
git clone https://github.com/Fruzh/book-app.git
cd book-app
```

### 🛢️ 2. Set Up the MySQL Database

Create a database in MySQL (via phpMyAdmin or terminal):

```sql
CREATE DATABASE book_app;
```

Ensure your MySQL server is running and accessible.

### 🔧 3. Configure and Run the Backend

```
cd backend
cp .env.example .env
```

Edit `.env` and update your MySQL credentials:

```env
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DB_NAME=book_app
```

Install dependencies and run migrations:

```bash
npm install
node ace migration:run
node ace serve --watch
```

🔗 Backend will run at: [http://localhost:3333](http://localhost:3333)


### 🌐 4. Configure and Run the Frontend

Open a new terminal tab/window:

```bash
cd frontend
touch .env.local
```

Create `.env.local` with the following:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

Install dependencies and start the frontend:

```bash
npm install
npm run dev
```

🔗 Frontend will run at: [http://localhost:3000](http://localhost:3000)

### 🎯 5. Access the App

Visit: [http://localhost:3000](http://localhost:3000)
Log in using a student role account (create via backend if needed).



## 🧪 Testing the App

* ✅ **Add a Book**: `/books/add`
* ✏️ **Edit a Book**: `/books/[id]`
* ❌ **Delete a Book**: Delete button on the detail/edit page
* 📁 **Uploads**: Check `frontend/public/uploads/` for images


## 🛠️ Troubleshooting

### ❗ Database Connection Error

* Ensure MySQL is running
* Verify credentials in `.env`
* Confirm `book_app` database exists

### ❗ Backend Not Starting

* Ensure port `3333` is free

  * On Linux/macOS: `lsof -i :3333`
  * On Windows: `netstat -a`
* Re-run: `npm install`

### ❗ Frontend API Errors

* Check if backend is running at `http://localhost:3333`
* Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### ❗ Image Upload Issues

* Ensure `frontend/public/uploads/` exists and is writable

  * On Linux/macOS: `chmod 775 frontend/public/uploads/`
* Confirm files are being uploaded and old images deleted on update

## 📝 Notes

* The app assumes a `student` role is defined in the backend.
* Uploaded images are saved in `frontend/public/uploads/`. Backup before deployment.
* In production:

  * Set environment variables securely
  * Use a reverse proxy (e.g., Nginx) for both frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a branch:

```
git checkout -b feature/your-feature
```

3. Commit your changes:

```
git commit -m "Add your feature"
```

4. Push and open a pull request:

```
git push origin feature/your-feature
```
