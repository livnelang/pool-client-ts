import "./AppModal.scss";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

export type AppModalType = "SUCCESS" | "FAIL" | "INFO";

export interface BaseModalProps {
  text: string;
  secondaryText?: string;
  confirmButtonText?: string;
  type?: AppModalType;
}

interface AppModalProps extends BaseModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const DEFAULT_CONFIRM_TEXT = "סגירה";

const AppModal = (props: AppModalProps) => {
  const { isOpen, onCloseModal, text, secondaryText, confirmButtonText, type } =
    props;

  const iconType: JSX.Element =
    type === "SUCCESS" ? (
      <FaRegCheckCircle className="success" />
    ) : type === "FAIL" ? (
      <FaRegTimesCircle className="failure" />
    ) : (
      <FaInfoCircle className="info" />
    );
  return (
    <Dialog
      open={isOpen}
      onClose={onCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="AppModal"
    >
      <DialogTitle id="alert-dialog-title" className="dialogTitle">
        {text} <span className="faIcon">{iconType}</span>
      </DialogTitle>
      <DialogContent>
        {secondaryText ? (
          <DialogContentText id="alert-dialog-description">
            {secondaryText}
          </DialogContentText>
        ) : null}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onCloseModal}>Disagree</Button> */}
        <Button onClick={onCloseModal} autoFocus>
          {confirmButtonText ?? DEFAULT_CONFIRM_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppModal;
