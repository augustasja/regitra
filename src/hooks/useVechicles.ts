import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteVechicle, getVechicleInfo } from "../services/store";
import {
  DELETE_VEHICLE,
  GET_VECHICLE_INFO,
  GET_VECHICLE_LIST,
} from "../lib/query-keys";

import type { VechicleList } from "../lib/types";
import { useSnackbar } from "notistack";

const useVechicles = (failCall: boolean = false) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null,
  );
  const [deletingVehicleId, setDeletingVehicleId] = useState<number | null>(
    null,
  );

  const getVechicle = useQuery({
    queryKey: GET_VECHICLE_INFO(selectedVehicleId),
    queryFn: () => getVechicleInfo(selectedVehicleId, failCall),
    retry: false,
    enabled: !!selectedVehicleId,
    staleTime: 1000 * 60 * 1, // 1min cache.
  });

  const deleteMutation = useMutation({
    mutationKey: DELETE_VEHICLE,
    mutationFn: (id: number) => deleteVechicle(id, failCall),
    retry: false,

    onSuccess: (removedVechicle) => {
      queryClient.setQueryData<VechicleList>(GET_VECHICLE_LIST, (old) =>
        old ? old.filter((v) => v.id !== removedVechicle.id) : [],
      );
      setDeletingVehicleId(null);
      enqueueSnackbar("Įrašas sėkmingai ištrintas!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    onError: (err) => {
      enqueueSnackbar("Įrašo ištrynimas nepavyko!", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setDeletingVehicleId(null);
    },
  });

  return {
    getVechicle,
    deleteMutation,
    selectedVehicleId,
    deletingVehicleId,
    setSelectedVehicleId,
    setDeletingVehicleId,
  };
};

export default useVechicles;
