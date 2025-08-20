import React from "react";
import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Filter({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  singerOptions,
  selectedSinger,
  onSingerChange,
  alphabet,
  onAlphabetChange,
  yearRange,
  onYearRangeChange,
  minYear,
  maxYear,
  onReset,
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <TextField
          fullWidth
          size="small"
          label="Search songs"
          placeholder="Search by title or singer"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button variant="outlined" startIcon={<FilterListIcon />} onClick={onToggleFilters}>
          Filter
        </Button>
      </Box>
      <Collapse in={showFilters}>
        <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="singer-label">Singer</InputLabel>
              <Select
                labelId="singer-label"
                label="Singer"
                value={selectedSinger}
                onChange={(e) => onSingerChange(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {singerOptions.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="alphabet-label">Alphabet</InputLabel>
              <Select
                labelId="alphabet-label"
                label="Alphabet"
                value={alphabet}
                onChange={(e) => onAlphabetChange(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch) => (
                  <MenuItem key={ch} value={ch}>
                    {ch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ flex: 2, minWidth: 300, px: { xs: 0, sm: 1 } }}>
              <Typography variant="caption">Year Range</Typography>
              <Slider
                value={yearRange}
                onChange={(_, val) => onYearRangeChange(val)}
                valueLabelDisplay="auto"
                min={minYear}
                max={maxYear}
                step={1}
                size="small"
                sx={{
                  '& .MuiSlider-rail': { height: 4 },
                  '& .MuiSlider-track': { height: 4 },
                  '& .MuiSlider-thumb': { width: 14, height: 14 },
                }}
              />
            </Box>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button variant="outlined" size="small" onClick={onReset}>
                Reset
              </Button>
            </Box>
        </Paper>
      </Collapse>
    </Box>
  );
}


