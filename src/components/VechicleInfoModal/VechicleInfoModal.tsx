import { Box, Modal, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import type { VechicleInfo } from "../../lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  data: VechicleInfo;
};

const VechicleInfoModal = ({ open, onClose, data }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 320, sm: 420, md: 520 },
          bgcolor: "background.paper",
          color: "text.primary",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size="small"
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="modal-modal-make"
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontWeight: 700, color: "var(--accent)" }}
        >
          {data.make}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600 }}>Modelis:</span> {data.model}
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600 }}>Metai:</span> {data.year}
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600 }}>Valstybinis numeris:</span> {data.regNr}
          </Typography>
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600 }}>Klasifikatorius:</span> {data.code}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default VechicleInfoModal;
