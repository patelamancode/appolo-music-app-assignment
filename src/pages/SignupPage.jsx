import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, TextField, Container, Paper, Box, Typography } from "@mui/material";
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
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h5" gutterBottom>Signup</Typography>
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
            <Button variant="contained" type="submit">Signup</Button>
            <Typography variant="body2">
              Already have an account? <Link to="/">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
