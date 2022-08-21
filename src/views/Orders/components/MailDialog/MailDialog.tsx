import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import AppModal from "../../../../components/AppModal/AppModal";
import { Month } from "../../utils/ordersUtils";
import useMailDialog from "./hooks/useMailDialog";

interface Props {
  isAllClients: boolean;
  selectedMonth: Month;
  setIsMailsDialogOpen: (isOpen: boolean) => void;
}

const MailDialog = (props: Props) => {
  const { setIsMailsDialogOpen } = props;
  const { dialogTitle, dialogState } = useMailDialog({
    isAllClients: props.isAllClients,
    selectedMonth: props.selectedMonth,
  });

  const renderDialogs = (): JSX.Element => {
    switch (dialogState) {
      case "NOT_VALID": {
        return (
          <AppModal
            isOpen={true}
            onCloseModal={() => setIsMailsDialogOpen(false)}
            text={"לא ניתן לשלוח לקוח בודד"}
          />
        );
      }
      case "VALID": {
        return (
          <Dialog
            open={true}
            onClose={() => setIsMailsDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="AppModal"
          >
            <DialogTitle id="alert-dialog-title" className="dialogTitle">
              {dialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                למי לשלוח
              </DialogContentText>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Disabled"
                />
              </FormGroup>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={onCloseModal}>Disagree</Button> */}
              <Button onClick={() => setIsMailsDialogOpen(false)} autoFocus>
                שלח
              </Button>
            </DialogActions>
          </Dialog>
        );
      }
    }
  };

  return renderDialogs();
};

export default MailDialog;
