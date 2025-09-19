import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, TextField, Container, Paper, Box, Typography, Divider } from "@mui/material";
import { signupSchema } from "../utils/validationSchemas";

export default function SignupPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(signup(values));
      navigate("/songs");
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={0} sx={{ width: "100%", maxWidth: 560, mx: "auto", overflow: "hidden", bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
        <Box>
          <Box sx={{ p: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, background: "radial-gradient(1200px 500px at -10% -20%, rgba(29,185,84,0.25), transparent), radial-gradient(900px 400px at 110% 120%, rgba(233,30,99,0.15), transparent)" }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: "text.secondary" }}>APPOLO MUSIC</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>Your soundtrack starts here</Typography>
            <Typography variant="body1" color="text.secondary">
              Create your free account to discover trending hits, vibe with handcrafted playlists, and get personalized recommendations tailored to your taste.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Unlimited</Typography>
                <Typography variant="caption" color="text.secondary">skips & playlists</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Smart</Typography>
                <Typography variant="caption" color="text.secondary">recommendations</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Offline</Typography>
                <Typography variant="caption" color="text.secondary">listening (soon)</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: { xs: 4, md: 6 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: 420 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Create your account</Typography>
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
                <Button fullWidth size="large" sx={{ mt: 2 }} variant="contained" type="submit">
                  Sign up
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                  Already have an account? <Link to="/">Log in</Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
