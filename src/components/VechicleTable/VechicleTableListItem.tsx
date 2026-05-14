import { Box, Button } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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
    <TableRow
      key={row.id}
      sx={{
        "&:hover": { backgroundColor: "var(--accent-bg)" },
        transition: "background-color 0.2s",
      }}
    >
      <TableCell>{row.id}</TableCell>
      <TableCell sx={{ fontWeight: 500 }}>{row.regNr}</TableCell>
      <TableCell>{row.code}</TableCell>
      <TableCell align="right">
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => onView(row.id)}
            disabled={viewDisabled}
            loading={viewDisabled}
            sx={{ textTransform: "none", borderRadius: 1 }}
          >
            Peržiūrėti
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onRemove(row.id)}
            disabled={removeDisabled}
            loading={removeDisabled && !viewDisabled}
            sx={{ textTransform: "none", borderRadius: 1 }}
          >
            Panaikinti
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default VechicleTableListItem;
