import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "redux/api";
import SceneTitle from "components/SceneTitle/SceneTitle";
import GeoMap from "components/GeoMap/GeoMap";

const Geography = () => {
  const { data } = useGetGeographyQuery();
  const theme = useTheme();

  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Geography chart" />
      <Box
        mt="30px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data?.formattedLocation ? (
          <GeoMap theme={theme} locationData={data?.formattedLocation} />
        ) : (
          <Box>Loading...</Box>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
