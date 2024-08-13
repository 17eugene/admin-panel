import { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import SceneTitle from "components/SceneTitle/SceneTitle";
import OverviewChart from "components/OverviewChart/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");
  const selectHandler = (e) => {
    setView(e.target.value);
  };
  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Overview" />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem", width: "7rem" }}>
          <InputLabel>View</InputLabel>
          <Select value={view} label="View" onChange={selectHandler}>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
