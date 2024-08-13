import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery } from "redux/api";
import SceneTitle from "components/SceneTitle/SceneTitle";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.75,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.75,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    flex: 0.5,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.5,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery();
  const customersData = data?.customers;

  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Customers" />
      <Box mt="30px" height="75vh">
        <DataGrid
          loading={isLoading || !data}
          rows={customersData || []}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
