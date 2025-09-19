import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import { loginSchema } from "../utils/validationSchemas";
import { Button, TextField, Container, Paper, Box, Typography, Alert, Snackbar, Divider } from "@mui/material";
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
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={0} sx={{ width: "100%", maxWidth: 560, mx: "auto", overflow: "hidden", bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Box>
          <Box sx={{ p: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, background: "radial-gradient(1200px 500px at -10% -20%, rgba(29,185,84,0.25), transparent), radial-gradient(900px 400px at 110% 120%, rgba(233,30,99,0.15), transparent)" }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.secondary" }}>APPOLO MUSIC</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Dive into your soundscape</Typography>
            <Typography variant="body1" color="text.secondary">
              Millions of songs, curated playlists, and personalized mixes. Log in to pick up where you left off and keep the vibe going.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>50M+</Typography>
                <Typography variant="caption" color="text.secondary">tracks</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Top</Typography>
                <Typography variant="caption" color="text.secondary">charts & podcasts</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Ad-free</Typography>
                <Typography variant="caption" color="text.secondary">experience</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: { xs: 4, md: 6 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: 420 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Welcome back</Typography>
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Forgot password?</Typography>
                </Box>
                <Button fullWidth size="large" sx={{ mt: 2 }} variant="contained" type="submit">
                  Login
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                  New here? <Link to="/signup">Create an account</Link>
                </Typography>
              </Box>
            </Box>
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
