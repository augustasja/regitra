import { useQuery } from "@tanstack/react-query";
import { getVechicleList } from "./services/store";
import { GET_VECHICLE_LIST } from "./lib/query-keys";
import { Box, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import VechicleTable from "./components/VechicleTable/VechicleTable";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown";
import { useFailToggleContext } from "./providers/FailToggleProvider";

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
    <section className="py-5">
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
    </section>
  );
}

export default App;
