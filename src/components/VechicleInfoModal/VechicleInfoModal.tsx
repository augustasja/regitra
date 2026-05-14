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
          p: 3,
          outline: "none",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="modal-modal-make"
          variant="h6"
          component="h2"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {data.make}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography id="modal-modal-model" sx={{ mt: 0.5 }}>
          <strong>Modelis:</strong> {data.model}
        </Typography>
        <Typography id="modal-modal-year" sx={{ mt: 1 }}>
          <strong>Metai:</strong> {data.year}
        </Typography>
        <Typography id="modal-modal-registration-number" sx={{ mt: 1 }}>
          <strong>Valstybinis numeris:</strong> {data.regNr}
        </Typography>
        <Typography id="modal-modal-code" sx={{ mt: 1 }}>
          <strong>Klasifikatorius:</strong> {data.code}
        </Typography>
      </Box>
    </Modal>
  );
};

export default VechicleInfoModal;
