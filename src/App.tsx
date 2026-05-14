import { useQuery } from "@tanstack/react-query";
import { getVechicleList } from "./services/store";
import { GET_VECHICLE_LIST } from "./lib/query-keys";
import { CircularProgress } from "@mui/material";
import VechicleTable from "./components/VechicleTable/VechicleTable";

function App() {
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
        <VechicleTable rows={data} />
      ) : (
        <p>No vehicles found.</p>
      )}
    </section>
  );
}

export default App;
