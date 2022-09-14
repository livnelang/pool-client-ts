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
  CircularProgress,
} from "@mui/material";
import AppModal from "../../../../components/AppModal/AppModal";
import APIService from "../../../../helpers/api/API";
import { Month } from "../../utils/ordersUtils";
import useMailDialog from "./hooks/useMailDialog";
import "./MailDialog.scss";

interface Props {
  isAllClients: boolean;
  selectedMonth: Month;
  setIsMailsDialogOpen: (isOpen: boolean) => void;
  api: APIService;
}

const MailDialog = (props: Props) => {
  const { setIsMailsDialogOpen } = props;
  const {
    formState,
    handleSetMailOption,
    dialogTitle,
    dialogState,
    handleClickSendByMail,
    isSending,
    sendErrorMessage,
    disableSendBtn,
  } = useMailDialog({
    isAllClients: props.isAllClients,
    selectedMonth: props.selectedMonth,
    api: props.api,
  });

  const renderDialogs = (): JSX.Element => {
    switch (dialogState) {
      case "SEND_ONE_CUSTOMER": {
        return (
          <AppModal
            isOpen={true}
            onCloseModal={() => setIsMailsDialogOpen(false)}
            text={"לא ניתן לשלוח לקוח בודד"}
          />
        );
      }
      case "SEND_ERROR": {
        return (
          <AppModal
            isOpen={true}
            onCloseModal={() => setIsMailsDialogOpen(false)}
            text={sendErrorMessage ?? ""}
          />
        );
      }
      case "SEND_SUCCESS": {
        return (
          <AppModal
            type="SUCCESS"
            isOpen={true}
            onCloseModal={() => setIsMailsDialogOpen(false)}
            text={"המייל נשלח בהצלחה!"}
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
                {formState.mails.map((mail, idx) => {
                  return (
                    <FormControlLabel
                      key={`${mail.type}-${idx}`}
                      control={
                        <Checkbox
                          value={mail.value}
                          onChange={(e) =>
                            handleSetMailOption(mail.type, e.target.checked)
                          }
                        />
                      }
                      label={mail.label}
                    />
                  );
                })}
              </FormGroup>
            </DialogContent>
            <DialogActions className="mailDialogActions">
              <Button
                className="sendBtn"
                onClick={handleClickSendByMail}
                variant="outlined"
                disabled={isSending || disableSendBtn}
              >
                <span>שלח</span>
                {isSending ? <CircularProgress /> : null}
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
