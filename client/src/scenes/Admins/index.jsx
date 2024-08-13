import { Box } from "@mui/material";
import SceneTitle from "components/SceneTitle/SceneTitle";
import { useGetAdminsQuery } from "redux/api";
import { DataGrid } from "@mui/x-data-grid";

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

const Admins = () => {
  const { data, isLoading } = useGetAdminsQuery();
  const adminData = data?.admins;

  return (
    <Box m="1.25rem 2.5rem">
      <SceneTitle title="Admins" />
      <Box mt="30px" height="75vh">
        <DataGrid
          loading={!data || isLoading}
          rows={adminData || []}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Admins;
