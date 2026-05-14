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
        options={classificators || []}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        onChange={(_, value) => setSearch(value?.code || null)}
        value={classificators?.find((c) => c.code === search) || null}
        noOptionsText="Nerasta"
        renderInput={(params) => (
          <TextField {...params} label="Klasifikatorius" value={search} />
        )}
      />
    </Paper>
  );
};

export default FilterDropdown;
