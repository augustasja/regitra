import { useQuery } from "@tanstack/react-query";
import { getVechicleList } from "./services/store";
import { GET_VECHICLE_LIST } from "./lib/query-keys";
import { CircularProgress } from "@mui/material";
import type { VechicleList } from "./lib/types";

function App() {
  const { data, isLoading, isError, error } = useQuery<VechicleList>({
    queryKey: GET_VECHICLE_LIST,
    queryFn: () => getVechicleList(true),
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
        (data as VechicleList).map((item) => (
          <div key={item.regNr}>{item.regNr}</div>
        ))
      ) : (
        <p>No vehicles found.</p>
      )}
    </section>
  );
}

export default App;
