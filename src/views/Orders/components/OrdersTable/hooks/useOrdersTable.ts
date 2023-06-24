import { useCallback, useState } from "react";
import { DeleteOrderRequest, Order } from "../../../../../interfaces/Order";
import { useDeleteOrder } from "../query/useDeleteOrder";
import { BaseModalProps } from "../../../../../components/AppModal/AppModal";

interface Props {
  setIsModalOpen: Function;
  selectedOrder: Order | null;
  setSelectedOrder: Function;
  refreshTable: Function;
}

const modalOptionsInitialState: BaseModalProps = {
  text: "האם ברצונך למחוק את ההזמנה?",
  confirmButtonText: "מחק",
  type: "INFO",
};

const useOrdersTable = (props: Props) => {
  const [modalOptions, setModalOptions] = useState<BaseModalProps>(
    modalOptionsInitialState
  );

  const [isDeletingOrder, setIsDeletingOrder] = useState<boolean>(false);
  const { setIsModalOpen, selectedOrder, setSelectedOrder, refreshTable } =
    props;
  const { mutate } = useDeleteOrder();

  const handleConfirmDelete = useCallback(() => {
    const body: DeleteOrderRequest = { orderObjectId: selectedOrder?._id! };
    setIsDeletingOrder(true);
    mutate(body, {
      onSuccess: () => {
        refreshTable();
        setModalOptions({
          ...modalOptions,
          text: "ההזמנה נמחקה בהצלחה!",
          confirmButtonText: "סגור",
          type: "SUCCESS",
        });
      },
      onError: () => {},
      onSettled: () => {
        setIsDeletingOrder(false);
      },
    });
  }, [selectedOrder, useDeleteOrder]);

  const handleOpenModal = useCallback((order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (modalOptions.type === "SUCCESS") {
      setModalOptions(modalOptionsInitialState);
    }
    setIsModalOpen(false);
    setSelectedOrder(null);
  }, [modalOptions, modalOptionsInitialState]);
  return {
    handleOpenModal,
    handleCloseModal,
    handleConfirmDelete,
    isDeletingOrder,
    modalOptions,
  };
};

export default useOrdersTable;
