import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { logout } from "../redux/authSlice";
import { deleteSong } from "../redux/songSlice";
import { Button, Container, Paper, Box, Typography, Alert, Snackbar, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton, Tooltip } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Filter from "../components/Filter";

export default function SongListPage() {
  const { user } = useSelector((state) => state.auth);
  const songsByOwner = useSelector((state) => state.song.songs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const userSongs = songsByOwner?.[user?.email] || [];

  const userName = (str) => {
    return str.split("@")[0];
  };

  const years = useMemo(
    () => userSongs.map((s) => Number(s.year)).filter((n) => !Number.isNaN(n)),
    [userSongs]
  );
  const minYear = useMemo(() => (years.length ? Math.min(...years) : 1900), [years]);
  const maxYear = useMemo(
    () => (years.length ? Math.max(...years) : new Date().getFullYear()),
    [years]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const singerOptions = useMemo(
    () => Array.from(new Set(userSongs.map((s) => s.singer))).sort(),
    [userSongs]
  );
  const [selectedSinger, setSelectedSinger] = useState("");
  const [alphabet, setAlphabet] = useState("");
  const [yearRange, setYearRange] = useState([minYear, maxYear]);

  useEffect(() => {
    setYearRange([minYear, maxYear]);
  }, [minYear, maxYear]);

  const filteredSongs = useMemo(() => {
    let list = userSongs;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) || s.singer.toLowerCase().includes(q)
      );
    }
    if (selectedSinger) {
      list = list.filter((s) => s.singer === selectedSinger);
    }
    if (alphabet) {
      list = list.filter(
        (s) => (s.title?.[0] || "").toUpperCase() === alphabet
      );
    }
    if (yearRange) {
      const [min, max] = yearRange;
      list = list.filter((s) => {
        const y = Number(s.year);
        return !Number.isNaN(y) && y >= min && y <= max;
      });
    }
    return list;
  }, [userSongs, searchQuery, selectedSinger, alphabet, yearRange]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Welcome, {userName(user?.email)}</Typography>
          <Box>
            <Button variant="outlined" onClick={() => dispatch(logout())}>Logout</Button>
            <Button variant="contained" component={Link} to="/add-song" sx={{ ml: 1 }}>
              {userSongs.length === 0 ? "Add Song" : "Add More Songs"}
            </Button>
          </Box>
        </Box>
        <Filter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
          singerOptions={singerOptions}
          selectedSinger={selectedSinger}
          onSingerChange={setSelectedSinger}
          alphabet={alphabet}
          onAlphabetChange={setAlphabet}
          yearRange={yearRange}
          onYearRangeChange={setYearRange}
          minYear={minYear}
          maxYear={maxYear}
          onReset={() => {
            setSelectedSinger("");
            setAlphabet("");
            setYearRange([minYear, maxYear]);
            setSearchQuery("");
          }}
        />

        <Typography variant="subtitle1" gutterBottom>
          Your Songs {userSongs.length ? `(${filteredSongs.length})` : ""}
        </Typography>
        {userSongs.length === 0 ? (
          <Alert severity="info">No songs yet. Please add a song.</Alert>
        ) : filteredSongs.length === 0 ? (
          <Alert severity="warning">No songs match your search/filters.</Alert>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {filteredSongs.map((song) => (
              <Grid key={song.id} item xs={12} sm={6} md={4} lg={3}>
                <Card variant="outlined" sx={{ position: "relative", bgcolor: "background.paper", overflow: "hidden" }}>
                  <CardActionArea onClick={() => alert(`Playing ${song.title} 🎵`)}>
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={`https://picsum.photos/seed/${encodeURIComponent(song.title)}-poster/600/400`}
                        alt={`${song.title} poster`}
                        sx={{ filter: "saturate(0.9) contrast(1.05)" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(0,0,0,0.0)",
                          transition: "background-color 150ms ease-in-out",
                          "&:hover": { bgcolor: "rgba(0,0,0,0.35)" },
                        }}
                      >
                        <Box sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(29,185,84,0.95)",
                          transform: "scale(0.9)",
                          opacity: 0,
                          transition: "all 150ms ease-in-out",
                          "&:hover": { transform: "scale(1.0)" },
                          pointerEvents: "none",
                          [".MuiCardActionArea-root:hover &"]: {
                            opacity: 1,
                          },
                        }}>
                          <PlayArrowRoundedIcon fontSize="large" />
                        </Box>
                      </Box>
                    </Box>
                  </CardActionArea>
                  <CardContent>
                    <Typography variant="subtitle1" noWrap>{song.title}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{song.singer} • {song.year}</Typography>
                  </CardContent>
                  <Box sx={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 0.5 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="default" onClick={(e) => { e.stopPropagation?.(); navigate(`/edit/${song.id}`); }}>
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation?.(); dispatch(deleteSong({ owner: user.email, id: song.id })); navigate("/songs", { replace: true, state: { message: "Song deleted" } }); }}>
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => navigate("/songs", { replace: true, state: {} })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => navigate("/songs", { replace: true, state: {} })}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
