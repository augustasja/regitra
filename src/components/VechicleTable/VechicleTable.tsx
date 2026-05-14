import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import type { VechicleList } from "../../lib/types";
import VechicleTableListItem from "./VechicleTableListItem";
import { Suspense, useMemo } from "react";
import { lazy } from "react";
import useVechicles from "../../hooks/useVechicles";
import { useTableFilters } from "../../hooks/useTableFilters";

const VechicleInfoModal = lazy(
  () => import("../VechicleInfoModal/VechicleInfoModal"),
);

type Props = {
  rows: VechicleList;
};

const VechicleTable = ({ rows }: Props) => {
  const { search } = useTableFilters();

  const {
    getVechicle,
    deleteMutation,
    selectedVehicleId,
    deletingVehicleId,
    setSelectedVehicleId,
    setDeletingVehicleId,
  } = useVechicles();

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
    <Paper className="w-full overflow-hidden">
      <TableContainer className="max-h-[740px] overflow-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Valstybinis numeris</TableCell>
              <TableCell>Klasifikatorius</TableCell>
              <TableCell align="right">Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => {
              const isViewing =
                getVechicle.isLoading && selectedVehicleId === row.id;
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
                <TableCell colSpan={4} align="center">
                  Nėra transporto priemonių su šiuo klasifikatoriumi.
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
