import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editSong } from "../redux/songSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Paper, Box, Typography } from "@mui/material";

export default function EditSongPage() {
  const { id } = useParams(); // song id from URL
  const { user } = useSelector((state) => state.auth);
  const songsByOwner = useSelector((state) => state.song.songs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSongs = songsByOwner?.[user.email] || [];
  const songToEdit = userSongs.find((s) => s.id === id);

//   validation for no song
  if (!songToEdit) {
    return (
      <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" gutterBottom>Song not found</Typography>
          <Button variant="contained" onClick={() => navigate("/songs")}>
            Back to List
          </Button>
        </Paper>
      </Container>
    );
  }

  const formik = useFormik({
    initialValues: {
      title: songToEdit.title,
      singer: songToEdit.singer,
      year: songToEdit.year,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      singer: Yup.string().required("Singer is required"),
      year: Yup.number()
        .min(1900, "Enter valid year")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Year is required"),
    }),
    onSubmit: (values) => {
      dispatch(editSong({ owner: user.email, id, updatedSong: values }));
      navigate("/songs", { state: { message: "Song updated successfully" } });
    },
  });

  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h5" gutterBottom>Edit Song</Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="title"
            name="title"
            label="Song Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            id="singer"
            name="singer"
            label="Singer"
            value={formik.values.singer}
            onChange={formik.handleChange}
            error={formik.touched.singer && Boolean(formik.errors.singer)}
            helperText={formik.touched.singer && formik.errors.singer}
          />
          <TextField
            fullWidth
            margin="normal"
            id="year"
            name="year"
            label="Year"
            type="number"
            value={formik.values.year}
            onChange={formik.handleChange}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          />

          <Button color="primary" variant="contained" type="submit">
            Save Changes
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="outlined"
            onClick={() => navigate("/songs")}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
