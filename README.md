
# 📚 Book App

**A web-based book management application**  
Built with **Next.js** (frontend) and **AdonisJS** (backend), using **MySQL** for data storage.



## ✨ Features

- 📖 **Add, edit, view, and delete books** with details like:
  - Title
  - Author
  - Category
  - Description
  - Content
  - Cover Image
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
│   └── public/        # Static assets (e.g., uploads/)
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
node ace db:seed
node ace serve --watch
```

🔗 Backend will run at: [http://localhost:3333](http://localhost:3333)


### 🌐 4. Configure and Run the Frontend

Open a new terminal tab/window, install dependencies and start the frontend:

```bash
npm install
npm run dev
```

🔗 Frontend will run at: [http://localhost:3000](http://localhost:3000)

### 🎯 5. Access the App

Visit: [http://localhost:3000](http://localhost:3000)

## 🧪 Testing the App

* ✅ **Add a Book**: `/books/add`
* ✏️ **Edit a Book**: `/books/[id]`
* ❌ **Delete a Book**: Delete button on the detail/edit page
* 📁 **Uploads**: Check `frontend/public/uploads/` for images