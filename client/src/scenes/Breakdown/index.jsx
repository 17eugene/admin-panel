import { Box } from "@mui/material";
import SceneTitle from "components/SceneTitle/SceneTitle";
import BreakdownChart from "components/BreakdownChart/BreakdownChart";

const Breakdown = () => {
  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Breakdown" />
      <Box height="75vh" mt="20px">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
