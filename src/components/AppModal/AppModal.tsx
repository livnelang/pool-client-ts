import "./AppModal.scss";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { CgSpinner } from "react-icons/cg";
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

export interface AppModalProps extends BaseModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onConfirm?: () => void;
  isConfirmButtonDisabled?: boolean
  showSpinner?: boolean
}

const DEFAULT_CONFIRM_TEXT = "סגירה";

const AppModal = (props: AppModalProps) => {
  const { isOpen, onCloseModal, isConfirmButtonDisabled,  onConfirm,  text, secondaryText, confirmButtonText, type, showSpinner } =
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
        <Button onClick={onConfirm ?? onCloseModal} disabled={isConfirmButtonDisabled} autoFocus>
          {confirmButtonText ?? DEFAULT_CONFIRM_TEXT}
        </Button>
        {showSpinner && <CgSpinner className="spinner" />}
      </DialogActions>
    </Dialog>
  );
};

export default AppModal;
