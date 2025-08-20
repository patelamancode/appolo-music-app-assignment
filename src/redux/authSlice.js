import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, password } = action.payload;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));

      state.user = { email };
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      //   console.log("input login", email, password);
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      //   console.log("selected user", foundUser);

      if (foundUser) {
        state.user = { email: foundUser.email };
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("auth", JSON.stringify(state));
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Invalid email or password!";
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("auth");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    loadAuthFromStorage: (state) => {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsed = JSON.parse(data);
        state.user = parsed.user;
        state.isAuthenticated = parsed.isAuthenticated;
        state.error = parsed.error ?? null;
      }
    },
  },
});

export const { signup, login, logout, loadAuthFromStorage, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
