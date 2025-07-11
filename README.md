
# 🎵 Music Streaming Backend

A Node.js + Express backend for a music streaming platform, built using Sequelize ORM with PostgreSQL. It supports user authentication, music management, and playlist creation.

---

## 🚀 Features

- ✅ User registration and authentication  
- 🎶 Upload and manage songs  
- 📁 Create and manage playlists  
- 🔒 Protected routes via auth middleware  
- 🔗 Sequelize relationships for users, playlists, and songs  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express  
- **Database**: PostgreSQL (Sequelize ORM)  
- **Other**: dotenv, CORS, RESTful API  

---

## 📦 Installation

```bash
git clone https://github.com/webdevabdul0/music_streaming_backend
cd music_streaming_backend
npm install
```

---

## ⚙️ Setup

1. Create a `.env` file in the root directory:

```env
PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_DIALECT=postgres
```

2. Start the server:

```bash
npm start
```

The API will run at: `http://localhost:5000`

---

## 📌 API Endpoints

| Route Prefix      | Description                        |
|------------------|------------------------------------|
| `/api/users`     | User auth, profile, protected data |
| `/api/music`     | Upload and manage music            |
| `/api/playlists` | Create/edit playlists              |

---

## 🔗 Sequelize Relationships

- `User` has many `Playlists`  
- `Playlist` belongs to `User`  
- `Playlist` belongs to many `Music` via `MusicPlaylist`  
- `Music` belongs to many `Playlist` via `MusicPlaylist`  

---

## 📝 License

MIT License
