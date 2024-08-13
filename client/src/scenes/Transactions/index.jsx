import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "redux/api";
import { DataGrid } from "@mui/x-data-grid";
import SceneTitle from "components/SceneTitle/SceneTitle";
import DataGridCustomToolbar from "components/DataGridCustomToolbar/DataGridCustomToolbar";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 0.75,
  },
  {
    field: "createdAt",
    headerName: "Created At",
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

const Transactions = () => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    itemsPerPage,
    search,
    sort: JSON.stringify(sort),
  });
  const theme = useTheme();
  
  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Transactions" />
      <Box
        height="75vh"
        mt="30px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-main": {
            border: "1px solid rgb(81, 81, 81)",
          },
          "& .MuiDataGrid-footerContainer": {
            border: "1px solid rgb(81, 81, 81)",
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          columns={columns}
          rows={data?.data?.transactions || []}
          rowCount={data?.data?.totalDocs || 0}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
          page={page}
          pageSize={itemsPerPage}
          pagination
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setItemsPerPage(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
