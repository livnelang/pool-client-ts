import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIService from "../../../../../helpers/api/API";
import useCustomForm from "../../../../../hooks/useCustomForm";
import {
  AppMails,
  MappedMailOptionValue,
  SendOrderByMailRequest,
} from "../../../../../interfaces/Mail";
import { RootState } from "../../../../../store/rtkStore";
import { Month } from "../../../utils/ordersUtils";
import useTitle from "./useTitle";

interface Props {
  isAllClients: boolean;
  selectedMonth: Month;
  api: APIService;
}

type DialogState =
  | "VALID"
  | "SEND_ONE_CUSTOMER"
  | "SEND_ERROR"
  | "SEND_SUCCESS";

interface MailOption {
  type: keyof AppMails;
  label: string;
  value: boolean;
}

interface FormState {
  mails: MailOption[];
}

const initialFormState: FormState = {
  mails: [
    {
      type: "defaultMailAddress",
      label: "",
      value: false,
    },
    {
      type: "ownerMailAddress",
      label: "",
      value: false,
    },
    {
      type: "extraAccountantMail",
      label: "",
      value: false,
    },
  ],
};

const useMailDialog = (props: Props) => {
  const { isAllClients, selectedMonth, api } = props;
  const [isMailsDialogOpen, setIsMailsDialogOpen] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<DialogState>("VALID");
  const { dialogTitle, formatterDate } = useTitle({
    monthName: selectedMonth.name,
  });
  const { formState, setFormState, handleFormStateFieldChange } =
    useCustomForm<FormState>(initialFormState);
  const appMails = useSelector((state: RootState) => state.auth.mails);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendErrorMessage, setSendErrorMessage] = useState<null | string>(null);
  const [disableSendBtn, setDisableSendBtn] = useState<boolean>(true);

  const handleClickSendByMail = async () => {
    const mailDetailsReq = formState.mails.reduce((obj, item) => {
      obj[item.type] = item.value;
      return obj;
    }, {} as MappedMailOptionValue);
    const body: SendOrderByMailRequest = {
      subjectPrefix: dialogTitle,
      dateText: formatterDate,
      formObject: {
        date: selectedMonth.range,
      },
      mailsDetails: mailDetailsReq,
    };
    setIsSending(true);
    api
      .sendOrdersByMail(body)
      .then(() => setDialogState("SEND_SUCCESS"))
      .catch((e: any) => {
        setSendErrorMessage(e.response.data.message);
        setDialogState("SEND_ERROR");
      })
      .finally(() => setIsSending(false));
  };

  const handleSetMailOption = (
    mailType: keyof AppMails,
    isChecked: boolean
  ) => {
    const updatedMails = formState.mails.map((m) => {
      if (m.type !== mailType) {
        return m;
      }
      return {
        ...m,
        value: isChecked,
      };
    });
    handleFormStateFieldChange("mails", updatedMails);
  };

  const shouldDisableSendButton = (): boolean => {
    for (let m of formState.mails) {
      if (m.value) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (appMails !== null) {
      let updatedMails = formState.mails;
      for (let mail of updatedMails) {
        switch (mail.type) {
          case "defaultMailAddress": {
            mail.label = `מש"א - ${appMails[mail.type]}`;
            break;
          }
          case "ownerMailAddress": {
            mail.label = `עוז נוי - ${appMails[mail.type]}`;
            break;
          }
          case "extraAccountantMail": {
            mail.label = `מיכל הנה"ח - ${appMails[mail.type]}`;
            break;
          }
        }
      }
      setFormState({ mails: updatedMails });
    }
  }, [appMails]);

  useEffect(() => {
    setDisableSendBtn(shouldDisableSendButton());
  }, [formState.mails]);

  useEffect(() => {
    setDialogState(isAllClients ? "VALID" : "SEND_ONE_CUSTOMER");
  }, [isAllClients]);
  return {
    isMailsDialogOpen,
    setIsMailsDialogOpen,
    dialogTitle,
    dialogState,
    formState,
    handleSetMailOption,
    handleClickSendByMail,
    isSending,
    sendErrorMessage,
    disableSendBtn,
  };
};

export default useMailDialog;
