import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import styles from "./styles/filterpanel.module.css";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxwidth: 250,
    },
  },
};

const colors = ["Red", "Blue", "Green"];
const genders = ["Men", "Women"];
const types = ["Polo", "Hoodie", "Basic"];
const prices = ["0-250", "251-450", "450"];

const FilterPanel = ({ setFilters }) => {
  const theme = useTheme();
  const [colour, setColour] = useState([]);
  const [sex, setSex] = useState([]);
  const [type, setType] = useState([]);
  const [price, setPrice] = useState([]);
  const dropdownWidth = theme.breakpoints.up("sm") ? "17rem" : "10rem";
  const handleChange = (event, func) => {
    const {
      target: { value },
    } = event;
    func(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    const filters = { color: colour, gender: sex, type: type, price: price };
    setFilters(filters);
  }, [colour, price, type, sex, setFilters]);
  return (
    <div>
      <Box className={styles.filterBox}>
        <FormControl sx={{ m: 1, width: dropdownWidth }}>
          <InputLabel id="demo-multiple-chip-label">Color</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={colour}
            onChange={(e) => {
              handleChange(e, setColour);
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Color</em>
            </MenuItem>
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                <Checkbox checked={colour.indexOf(color) > -1} />
                <ListItemText primary={color} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: dropdownWidth }}>
          <InputLabel id="demo-multiple-chip-label">Gender</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={sex}
            onChange={(e) => {
              handleChange(e, setSex);
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Gender</em>
            </MenuItem>
            {genders.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={sex.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: dropdownWidth }}>
          <InputLabel id="demo-multiple-chip-label">Price</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={price}
            onChange={(e) => {
              handleChange(e, setPrice);
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Price</em>
            </MenuItem>
            {prices.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={price.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: dropdownWidth }}>
          <InputLabel id="demo-multiple-chip-label">Type</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={type}
            onChange={(e) => {
              handleChange(e, setType);
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Type</em>
            </MenuItem>
            {types.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={type.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default FilterPanel;
