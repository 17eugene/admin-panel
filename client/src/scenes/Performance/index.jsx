import { useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SceneTitle from "components/SceneTitle/SceneTitle";
import { useGetPerformanceQuery } from "redux/api";

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
    flex: 0.75,
  },

  {
    field: "products",
    headerName: "Number of products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },

  {
    field: "cost",
    headerName: "Cost",
    flex: 0.5,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];

const Performance = () => {
  const userId = useSelector((state) => state.global.userId);
  const theme = useTheme();
  const { data, isLoading } = useGetPerformanceQuery(userId);
  console.log(data);
  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Performance" />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Performance;
