import { useQuery } from "@tanstack/react-query";
import { getVechicleList } from "./services/store";
import { GET_VECHICLE_LIST } from "./lib/query-keys";
import { Box, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { useFailToggleContext } from "./providers/FailToggleProvider";

import VechicleTable from "./components/VechicleTable/VechicleTable";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown";

function App() {
  const { fail, setFail } = useFailToggleContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: GET_VECHICLE_LIST,
    queryFn: () => getVechicleList(),
    retry: false,
  });

  if (isLoading) {
    return <CircularProgress aria-label="Loading…" />;
  }

  if (isError) {
    return <p>Error loading vehicles: {(error as Error).message}</p>;
  }

  return (
    <Box component="section" sx={{ paddingY: 4 }}>
      {data && data.length > 0 ? (
        <>
          <Box
            component={"div"}
            sx={{
              marginBottom: 2,
            }}
          >
            <FormControlLabel
              sx={{
                marginLeft: 2,
              }}
              control={
                <Switch
                  checked={fail}
                  onChange={(e) => setFail(e.target.checked)}
                />
              }
              label="Įjungti klaidos režimą"
            />
          </Box>
          <FilterDropdown />
          <VechicleTable rows={data} />
        </>
      ) : (
        <p>No vehicles found.</p>
      )}
    </Box>
  );
}

export default App;
