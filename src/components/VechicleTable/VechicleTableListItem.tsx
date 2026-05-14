import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";
import type { VechicleListItem } from "../../lib/types";

type Props = {
  row: VechicleListItem;
  onView: (id: number) => void;
  onRemove: (id: number) => void;
  viewDisabled?: boolean;
  removeDisabled?: boolean;
};
const VechicleTableListItem = ({
  row,
  onView,
  onRemove,
  viewDisabled,
  removeDisabled,
}: Props) => {
  return (
    <TableRow key={row.id}>
      {/* Arba index + 1, jei nenorim exposint id */}
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.regNr}</TableCell>
      <TableCell>{row.code}</TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => onView(row.id)}
            disabled={viewDisabled}
            loading={viewDisabled}
          >
            Peržiūrėti
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onRemove(row.id)}
            disabled={removeDisabled}
            loading={removeDisabled}
          >
            Panaikinti
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default VechicleTableListItem;
