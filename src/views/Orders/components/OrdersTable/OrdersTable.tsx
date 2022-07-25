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

interface Props {
  rows: Order[];
}

const OrdersTable = ({ rows }: Props) => {
  const mappedRows = rows.map((row) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(row.date));
    return {
      ...row,
      date: formattedDate,
    };
  });
  return (
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
            <TableRow key={idx}>
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
  );
};

export default OrdersTable;
