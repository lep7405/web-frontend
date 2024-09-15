import * as React from "react";
import { Container, Dialog } from "@mui/material";
import LoadingSvg from "../assets/loading.svg";
import NiceModal, { useModal, muiDialogV5 } from "@ebay/nice-modal-react";
import ReactLoading from "react-loading";
const LoadingModal = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Container sx={{ position: "relative" }}>
        <img
          src={LoadingSvg}
          alt="loading"
          style={{ width: "100px", height: "100px" }}
        />
      </Container>
    </Dialog>
  );
});

export default LoadingModal;
