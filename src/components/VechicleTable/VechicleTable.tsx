import { lazy, useEffect } from "react";
import { Suspense, useMemo } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import VechicleTableListItem from "./VechicleTableListItem";

import useVechicles from "../../hooks/useVechicles";
import type { VechicleList } from "../../lib/types";
import { useTableFilters } from "../../hooks/useTableFilters";
import { useFailToggleContext } from "../../providers/FailToggleProvider";

const VechicleInfoModal = lazy(
  () => import("../VechicleInfoModal/VechicleInfoModal"),
);

type Props = {
  rows: VechicleList;
};

const VechicleTable = ({ rows }: Props) => {
  const { search } = useTableFilters();
  const { fail } = useFailToggleContext();

  const {
    getVechicle,
    deleteMutation,
    selectedVehicleId,
    deletingVehicleId,
    setSelectedVehicleId,
    setDeletingVehicleId,
  } = useVechicles(fail);

  const { isError } = getVechicle;

  useEffect(() => {
    if (isError) {
      setSelectedVehicleId(null);
    }
  }, [isError, setSelectedVehicleId]);

  const handleOnRemove = (id: number) => {
    setDeletingVehicleId(id);
    deleteMutation.mutate(id);
  };

  const filteredRows = useMemo(
    () =>
      rows.filter((row) =>
        row.code.toLowerCase().includes(search.toLocaleLowerCase()),
      ),
    [rows, search],
  );

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: "740px",
          overflow: "auto",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "var(--code-bg)" }}>
              <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                Valstybinis numeris
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Klasifikatorius</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Veiksmai
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const isViewing =
                getVechicle.isFetching && selectedVehicleId === row.id;
              const isDeleting =
                deleteMutation.isPending && deletingVehicleId === row.id;

              return (
                <VechicleTableListItem
                  key={row.id}
                  row={row}
                  onView={setSelectedVehicleId}
                  onRemove={handleOnRemove}
                  viewDisabled={isViewing}
                  removeDisabled={isDeleting || isViewing}
                />
              );
            })}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ py: 4, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      Nėra transporto priemonių su šiuo klasifikatoriumi.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedVehicleId && getVechicle.data && (
        <Suspense fallback={null}>
          <VechicleInfoModal
            open={!!selectedVehicleId}
            onClose={() => setSelectedVehicleId(null)}
            data={getVechicle.data}
          />
        </Suspense>
      )}
    </Paper>
  );
};

export default VechicleTable;
