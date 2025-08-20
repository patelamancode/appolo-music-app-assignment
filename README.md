🎵 React Song Manager App

A simple React + Redux Toolkit assignment project where users can sign up, log in, and manage their own song list with CRUD operations (Add, Edit, Delete, Play). Songs are stored in localStorage, so no backend is required.

🚀 Features :
------------

🔐 Authentication (Signup, Login, Logout) with localStorage

🎶 Song Management (Add, Edit, Delete, Play) per user

🔍 Song Filters (Planned) – Search by Singer, Alphabet, Year Range

🎨 Built with React, Redux Toolkit, Material UI, Formik, Yup

💾 Persistent state using localStorage

🛠️ Tech Stack :
--------------

React 18+

Redux Toolkit (for state management)

React Router DOM v6 (for navigation and protected routes)

Material UI (MUI) (for UI components)

Formik + Yup (for forms and validation)

LocalStorage (for persistence, no backend needed)

📂 Project Structure:
--------------------
src/
 ├── pages/             # Login, Signup, SongList, AddSong, EditSong pages
 ├── redux/             # Redux slices (authSlice, songSlice)
 ├── components/        # Reusable UI components (if any)
 ├── App.jsx            # Routes + Protected Routes setup
 ├── index.js           # App entry point

🔑 Dummy User Data :
-------------------

The app starts with pre-seeded songs for testing:

// Seed dummy data for starting the app
songs = {
  "test@gmail.com": [
    { id: "1", title: "Shape of You", singer: "Ed Sheeran", year: 2017 },
    { id: "2", title: "Blinding Lights", singer: "The Weeknd", year: 2019 },
    { id: "3", title: "Believer", singer: "Imagine Dragons", year: 2017 },
  ],
};

===================================

👉 Login with test@gmail.com (use any password you registered during signup) to see the dummy songs.

===================================

🏃‍♂️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/react-song-manager.git
cd react-song-manager

2️⃣ Install Dependencies
npm install

3️⃣ Run the App
npm start


App will run at: http://localhost:3000





=================

📖 Usage Flow

Signup with a new email & password → stored in localStorage.

Login → access your personal song list.

Song List Page → view all songs for your account.

Add Song → create new songs.

Edit Song → update song details.

Delete Song → remove a song.

Play Button → simulate playing the song (popup alert).

====================

📝 Future Enhancements

✅ Search bar for songs

✅ Filters by Singer, Alphabet, Year Range

✅ Pagination for large song lists

✅ Integration with a backend API

👨‍💻 Author

Aman Patel
Frontend Developer (React.js, Redux, TypeScript)