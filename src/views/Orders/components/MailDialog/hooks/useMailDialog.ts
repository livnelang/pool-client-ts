import { useEffect, useState } from "react";
import { Month } from "../../../utils/ordersUtils";
import useTitle from "./useTitle";
interface Props {
  isAllClients: boolean;
  selectedMonth: Month;
}

type DialogState = "VALID" | "NOT_VALID";

const useMailDialog = (props: Props) => {
  const { isAllClients, selectedMonth } = props;
  const [isMailsDialogOpen, setIsMailsDialogOpen] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<DialogState>("VALID");
  const { dialogTitle } = useTitle({ monthName: selectedMonth.name });

  useEffect(() => {
    setDialogState(isAllClients ? "VALID" : "NOT_VALID");
  }, [isAllClients]);
  return { isMailsDialogOpen, setIsMailsDialogOpen, dialogTitle, dialogState };
};

export default useMailDialog;
