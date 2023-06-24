import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Order } from "../../../../interfaces/Order";
import "./OrdersTable.scss";
import useOrdersTable from "./hooks/useOrdersTable";
import AppModal from "../../../../components/AppModal/AppModal";
import useModal from "../../../../hooks/useModal";
import { useState } from "react";

interface Props {
  rows: Order[];
  refreshTable: () => void;
}

const OrdersTable = ({ rows, refreshTable }: Props) => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const {
    handleOpenModal,
    handleCloseModal,
    handleConfirmDelete,
    isDeletingOrder,
    modalOptions,
  } = useOrdersTable({
    setIsModalOpen,
    selectedOrder,
    setSelectedOrder,
    refreshTable,
  });
  const mappedRows = rows.map((row) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(row.date));
    return {
      ...row,
      date: formattedDate,
    };
  });

  if (mappedRows.length === 0) {
    return null;
  }
  return (
    <>
      <TableContainer className="OrdersTable" component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">לקוח </TableCell>
              <TableCell align="right">מוצר/מחיר</TableCell>
              <TableCell align="right">כמות</TableCell>
              <TableCell align="right">תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedRows.map((row, idx) => (
              <TableRow
                key={idx}
                onClick={() => {
                  handleOpenModal(row);
                }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell align="right">
                  {row.productName} / {row.pricePerProduct}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AppModal
        {...modalOptions}
        isOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        onConfirm={
          modalOptions.type === "INFO" ? handleConfirmDelete : handleCloseModal
        }
        showSpinner={isDeletingOrder}
        isConfirmButtonDisabled={isDeletingOrder}
      />
    </>
  );
};

export default OrdersTable;
