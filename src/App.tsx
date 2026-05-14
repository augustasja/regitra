import { useQuery } from "@tanstack/react-query";
import { getVechicleList } from "./services/store";
import { GET_VECHICLE_LIST } from "./lib/query-keys";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useFailToggleContext } from "./providers/FailToggleProvider";

import VechicleTable from "./components/VechicleTable/VechicleTable";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown";

function App() {
  const { fail, setFail } = useFailToggleContext();

  const { data, isLoading } = useQuery({
    queryKey: GET_VECHICLE_LIST,
    queryFn: () => getVechicleList(),
    retry: false,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress aria-label="Loading…" />
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ py: 4, px: 2 }}>
      {data && data.length > 0 ? (
        <>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Transporto priemonės
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={fail}
                  onChange={(e) => setFail(e.target.checked)}
                />
              }
              label="Klaidos režimas"
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <FilterDropdown />
          </Box>
          <VechicleTable rows={data} />
        </>
      ) : (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            Nerasta transporto priemonių.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default App;
