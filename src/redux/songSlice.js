import { createSlice } from "@reduxjs/toolkit";

const loadSongs = () => {
  let songs = JSON.parse(localStorage.getItem("songs"));
  if (!songs) {
    // Seed dummy data for starting the app
    songs = {
      "test@gmail.com": [
        { id: "1", title: "Shape of You", singer: "Ed Sheeran", year: 2017 },
        { id: "2", title: "Blinding Lights", singer: "The Weeknd", year: 2019 },
        { id: "3", title: "Believer", singer: "Imagine Dragons", year: 2017 },
      ]
    };
    localStorage.setItem("songs", JSON.stringify(songs));
  }
  return songs;
};

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: loadSongs(),
  },
  reducers: {
    addSong: (state, action) => {
      const { owner, song } = action.payload;
      if (!state.songs[owner]) {
        state.songs[owner] = [];
      }
      state.songs[owner].push(song);
      localStorage.setItem("songs", JSON.stringify(state.songs));
    },
    editSong: (state, action) => {
      const { owner, id, updatedSong } = action.payload;
      const userSongs = state.songs[owner] || [];
      const index = userSongs.findIndex((s) => s.id === id);
      if (index !== -1) {
        userSongs[index] = { ...userSongs[index], ...updatedSong };
        state.songs[owner] = userSongs;
        localStorage.setItem("songs", JSON.stringify(state.songs));
      }
    },
    deleteSong: (state, action) => {
      const { owner, id } = action.payload;
      state.songs[owner] = (state.songs[owner] || []).filter(
        (s) => s.id !== id
      );
      localStorage.setItem("songs", JSON.stringify(state.songs));
    },
  },
});

export const { addSong, editSong, deleteSong } = songSlice.actions;
export default songSlice.reducer;
