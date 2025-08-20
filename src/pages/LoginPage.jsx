import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import { loginSchema } from "../utils/validationSchemas";
import { Button, TextField, Container, Paper, Box, Typography, Alert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthError } from "../redux/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (value) => {
      dispatch(login(value));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/songs");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Button variant="contained" type="submit">Login</Button>
            <Typography variant="body2">
              No account? <Link to="/signup">Signup</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={Boolean(authError)}
        autoHideDuration={4000}
        onClose={() => dispatch(clearAuthError())}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => dispatch(clearAuthError())}>
          {authError}
        </Alert>
      </Snackbar>
    </Container>
  );
}
