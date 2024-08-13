import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween/FlexBetween";
import SceneTitle from "components/SceneTitle/SceneTitle";
import OverviewChart from "components/OverviewChart/OverviewChart";
import BreakdownChart from "components/BreakdownChart/BreakdownChart";
import StatBox from "components/StatBox/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardStatsQuery } from "redux/api";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },

  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },

  {
    field: "createdAt",
    headerName: "Created at",
    flex: 1,
  },

  {
    field: "products",
    headerName: "# of products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },

  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];

const Dashboard = () => {
  const isNonMediaScreen = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();
  const { data, isLoading } = useGetDashboardStatsQuery();
  console.log(data?.data);
  return (
    <Box m="1.25rem 2.5rem">
      <FlexBetween mb="40px">
        <SceneTitle title="Dashboard" />

        <Box>
          <Button
            sx={{
              background: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: 700,
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="150px"
        gap="15px"
        sx={{
          "& > div": { gridColumn: isNonMediaScreen ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data?.data?.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={data?.data?.todayStats?.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          p="0.75rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.45rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data?.data?.thisMonthStats?.totalSales}
          increase="+8%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={data?.data?.yearlySalesTotal}
          increase="+41%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box gridColumn="span 7" gridRow="span 3">
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data?.data?.transactions || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.45rem"
          p="2rem 1.5rem"
        >
          <Typography variant="h6" color={theme.palette.secondary[100]} fontSize="18px" mb="2rem">
            Sales By Categories
          </Typography>
          <BreakdownChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
