import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween/FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="10px"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.5rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        color={theme.palette.secondary[200]}
      >
        {value}
      </Typography>

      <FlexBetween>
        <Typography
          variant="h5"
          fontStyle="italic"
          color={theme.palette.secondary.light}
        >
          {increase}
        </Typography>

        <Typography fontSize="12px">
          {description}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
