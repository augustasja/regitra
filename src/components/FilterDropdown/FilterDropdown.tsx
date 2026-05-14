import {
  Autocomplete,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getClassificators } from "../../services/store";
import { GET_CLASIFICATORS } from "../../lib/query-keys";
import { useTableFilters } from "../../hooks/useTableFilters";

const FilterDropdown = () => {
  const { search, setSearch } = useTableFilters();

  const {
    data: classificators,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: GET_CLASIFICATORS,
    queryFn: () => getClassificators(),
  });

  if (isLoading) {
    return <CircularProgress aria-label="Loading…" />;
  }

  return (
    <Paper
      sx={{
        display: "inline-flex",
        mb: 3,
      }}
    >
      <Autocomplete
        disablePortal
        options={classificators.map((option) => option.code)}
        sx={{ width: 300 }}
        onChange={(_, value) => setSearch(value)}
        value={search}
        renderInput={(params) => (
          <TextField
            {...params}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Klasifikatorius"
          />
        )}
      />
    </Paper>
  );
};

export default FilterDropdown;
