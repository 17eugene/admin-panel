import { useCallback } from "react";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween/FlexBetween";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const changeSearchInputHandler = useCallback(
    (e) => {
      setSearchInput(e.target.value);
    },
    [setSearchInput]
  );

  const onSearchClickHandler = useCallback(() => {
    setSearch(searchInput);
    setSearchInput("");
  }, [setSearch, setSearchInput, searchInput]);
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>

        <TextField
          variant="standard"
          label="Search by user..."
          sx={{ mb: "0.5rem", width: "12rem" }}
          onChange={changeSearchInputHandler}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onSearchClickHandler}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
