import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import type { VechicleList } from "../../lib/types";
import VechicleTableListItem from "./VechicleTableListItem";
import {
  DELETE_VEHICLE,
  GET_VECHICLE_INFO,
  GET_VECHICLE_LIST,
} from "../../lib/query-keys";
import { deleteVechicle, getVechicleInfo } from "../../services/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { lazy } from "react";

const VechicleInfoModal = lazy(
  () => import("../VechicleInfoModal/VechicleInfoModal"),
);

type Props = {
  rows: VechicleList;
};

const VechicleTable = ({ rows }: Props) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null,
  );
  const [deletingVehicleId, setDeletingVehicleId] = useState<number | null>(
    null,
  );

  const queryClient = useQueryClient();

  const {
    data: vechicleInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: GET_VECHICLE_INFO(selectedVehicleId),
    queryFn: () => getVechicleInfo(selectedVehicleId),
    retry: false,
    enabled: !!selectedVehicleId,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: DELETE_VEHICLE,
    mutationFn: (id: number) => deleteVechicle(id),
    retry: false,

    onSuccess: (removedVechicle) => {
      queryClient.setQueryData<VechicleList>(GET_VECHICLE_LIST, (old) =>
        old ? old.filter((v) => v.id !== removedVechicle.id) : [],
      );
      setDeletingVehicleId(null);
    },
    onError: (err) => {
      console.error("Error deleting vehicle:", err);
      setDeletingVehicleId(null);
    },
  });

  const handleOnRemove = (id: number) => {
    setDeletingVehicleId(id);
    mutate(id);
  };

  return (
    <Paper className="w-full overflow-hidden">
      <TableContainer className="max-h-[740px] overflow-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Valstybinis numeris</TableCell>
              <TableCell>Kodas</TableCell>
              <TableCell align="right">Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isViewing = isLoading && selectedVehicleId === row.id;
              const isDeleting = isPending && deletingVehicleId === row.id;

              return (
                <VechicleTableListItem
                  key={row.id}
                  row={row}
                  onView={setSelectedVehicleId}
                  onRemove={handleOnRemove}
                  viewDisabled={isViewing}
                  removeDisabled={isDeleting}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedVehicleId && vechicleInfo && (
        <Suspense>
          <VechicleInfoModal
            open={!!selectedVehicleId}
            onClose={() => setSelectedVehicleId(null)}
            data={vechicleInfo}
          />
        </Suspense>
      )}
    </Paper>
  );
};

export default VechicleTable;
