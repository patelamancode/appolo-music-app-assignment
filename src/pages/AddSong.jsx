import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../redux/songSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { TextField, Button, Container, Paper, Box, Typography} from "@mui/material";

const songSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  singer: Yup.string().required("Singer is required"),
  year: Yup.number().min(1900).max(new Date().getFullYear()).required(),
});

export default function AddSongPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { title: "", singer: "", year: "" },
    validationSchema: songSchema,
    onSubmit: (values) => {
      const song = {
        id: uuid(),
        title: values.title,
        singer: values.singer,
        year: Number(values.year),
      };
      dispatch(addSong({ owner: user.email, song }));
      navigate("/songs", { state: { message: "Song added successfully" } });
    },
  });

  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h5" gutterBottom>Add New Song</Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth margin="normal"
            label="Song Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth margin="normal"
            label="Singer"
            name="singer"
            value={formik.values.singer}
            onChange={formik.handleChange}
            error={formik.touched.singer && Boolean(formik.errors.singer)}
            helperText={formik.touched.singer && formik.errors.singer}
          />
          <TextField
            fullWidth margin="normal"
            type="number"
            label="Year"
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Button variant="contained" type="submit">Add Song</Button>
            <Button
            style={{ marginLeft: "10px" }}
            variant="outlined"
            onClick={() => navigate("/songs")}
          >
            Cancel
          </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
