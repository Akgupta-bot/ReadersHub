

---

```markdown
# 📚 ReadersHub – Book Review Platform  

ReadersHub is a **full-stack MERN (MongoDB, Express, React, Node.js)** application that allows users to **sign up, log in, add books, and write reviews using real interactive star ratings.**  
It demonstrates secure authentication, MongoDB integration, CRUD operations, pagination, and a modern responsive UI with **Dark/Light Mode**.  

---

## 🌐 Live Demo  
- **Frontend (Vercel):** https://readershub.vercel.app  
- **Backend (Render):** https://readershub-backend.onrender.com  
- **Database:** MongoDB Atlas  

---

## 🚀 Features  

### 🔐 Authentication  
- Register with name, email, and password  
- Secure **password hashing (bcrypt)**  
- **JWT-based authentication**  
- Protected API routes with middleware  

### 📚 Book Management  
- Add, edit, delete, and view books  
- Each book includes: *Title, Author, Description, Genre, Published Year*  
- Only the creator can modify their book  
- Pagination (5 books per page)  
- Filter/search by **author**, **year**, or **rating**

### 💬 Review System  
- Add, edit, and delete reviews  
- **Interactive gold star** rating system (1-5 ⭐)  
- Dynamic **average rating** calculation  
- Shows reviewer name and ownership controls  

### 🎨 UI / UX  
- Responsive layout (Bootstrap + Custom CSS)  
- **Dark 🌙 / Light ☀️ Mode Toggle**  
- Clean transitions and interactive feedback  
- Simple navigation & real-time Axios updates  

---

## 🛠️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), React Router, Axios, React Icons, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ORM) |
| **Authentication** | JWT, bcrypt.js |
| **Deployment** | Frontend – Vercel • Backend – Render |
| **Version Control** | Git + GitHub |

---

## 📂 Folder Structure  

```

readershub/
│
├── backend/
│   ├── server.js                 # Express app entry point
│   ├── routes/
│   │   ├── authRoutes.js         # Login / Signup routes
│   │   ├── bookRoutes.js         # CRUD for books
│   │   └── reviewRoutes.js       # CRUD for reviews
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Book.js               # Book schema
│   │   └── Review.js             # Review schema
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   └── config/
│       └── db.js                 # MongoDB connection config
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Signup.jsx        # Register page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── BooksList.jsx     # All books with filters
│   │   │   ├── AddBook.jsx       # Add new book form
│   │   │   └── BookDetails.jsx   # Book details + reviews
│   │   ├── App.jsx               # App component & routes
│   │   ├── main.jsx              # React DOM entry point
│   │   ├── App.css               # Global styles
│   │   └── assets/               # Images & static files
│   └── vite.config.js
│
├── .env.example                  # Example environment variables
└── README.md                     # Project documentation

```

---

## ⚙️ Environment Variables  

### 🔹 Backend (`/backend/.env`)
```

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

### 🔹 Frontend (`/frontend/.env`)
```

VITE_API_URL=[https://your-backend.onrender.com/api](https://your-backend.onrender.com/api)

````

---

## 🧑‍💻 Local Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/readershub.git
cd readershub
````

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm run dev
```

Server runs at: **[http://localhost:5000](http://localhost:5000)**

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 🧩 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| `POST` | `/api/auth/register` | Register new user      |
| `POST` | `/api/auth/login`    | Log in & get JWT token |

### 📚 Book Routes

| Method   | Endpoint         | Description                  |
| -------- | ---------------- | ---------------------------- |
| `GET`    | `/api/books`     | Fetch all books (paginated)  |
| `POST`   | `/api/books`     | Add new book *(protected)*   |
| `GET`    | `/api/books/:id` | Get single book              |
| `PUT`    | `/api/books/:id` | Update book *(only creator)* |
| `DELETE` | `/api/books/:id` | Delete book *(only creator)* |

### 💬 Review Routes

| Method   | Endpoint               | Description                  |
| -------- | ---------------------- | ---------------------------- |
| `GET`    | `/api/reviews/:bookId` | Get all reviews              |
| `POST`   | `/api/reviews/:bookId` | Add new review *(protected)* |
| `PUT`    | `/api/reviews/:id`     | Edit review *(only owner)*   |
| `DELETE` | `/api/reviews/:id`     | Delete review *(only owner)* |

---

## 🚀 Deployment Guide

### 🖥 Backend – Render

1. Push your backend to GitHub
2. Go to [Render.com](https://render.com) → “New Web Service”
3. Connect your repo
4. Configure:

   ```
   Build Command: npm install
   Start Command: npm start
   ```
5. Add environment variables:

   * `MONGO_URI`
   * `JWT_SECRET`
6. Deploy 🚀

> Your backend will be live at
> [https://your-backend.onrender.com](https://your-backend.onrender.com)

---

### 🎨 Frontend – Vercel

1. Go to [Vercel.com](https://vercel.com) → “New Project”
2. Import your repo → select `/frontend`
3. Set build settings:

   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
4. Add environment variable:

   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
5. Deploy 🌍

> Your frontend will be live at
> [https://your-frontend.vercel.app](https://your-frontend.vercel.app)

---

## 📦 Example `.env.example`

```bash
# ==== Backend ====
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/readershub
JWT_SECRET=mysecretkey

# ==== Frontend ====
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## ⚙️ Deployment Configs

### `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### `render.yaml`

```yaml
services:
  - type: web
    name: readershub-backend
    env: node
    buildCommand: "npm install"
    startCommand: "npm start"
    envVars:
      - key: MONGO_URI
        value: your_mongodb_uri
      - key: JWT_SECRET
        value: your_jwt_secret
```

---

## 🧠 Future Enhancements

* 👤 Add user profiles (My Books & Reviews)
* 📊 Show rating analytics using Recharts
* 🔍 Full-text search and genre filtering
* 🧮 AI-powered book suggestions
* 📱 Mobile App version using React Native

---

## ❤️ Author

👨‍💻 **Anurag Kumar**
Full-Stack Developer | MERN Enthusiast

> “Where readers meet code.”

📧 **Email:** [your.email@example.com](mailto:your.email@example.com)
🔗 **GitHub:** [github.com/yourusername](https://github.com/yourusername)
🔗 **LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this project with proper attribution.

---

```

---

✅ This version includes:  
- Complete description & setup  
- Full folder structure section  
- Example `.env`, `vercel.json`, and `render.yaml`  
- Deployment instructions  
- Future roadmap  
- Author details  
touch
```
