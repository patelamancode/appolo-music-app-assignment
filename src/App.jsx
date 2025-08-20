import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SongList from "./pages/SongList";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AddSongPage from "./pages/AddSong";
import EditSongPage from "./pages/EditSong";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/songs"
          element={
            <ProtectedRoute>
              <SongList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-song"
          element={
            <ProtectedRoute>
              <AddSongPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditSongPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
