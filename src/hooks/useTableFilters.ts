import { useSearchParams } from "react-router-dom";

export function useTableFilters() {
  const [params, setParams] = useSearchParams();

  const search = params.get("search") || "";

  const setSearch = (value: string) => {
    const newParams = new URLSearchParams(params);

    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    setParams(newParams);
  };

  return {
    search,
    setSearch,
  };
}
