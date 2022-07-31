import "./OrdersTotalAmount.scss";

interface Props {
  sum: number;
  isAllClients: boolean;
}

const OrdersTotalAmount = ({ sum, isAllClients }: Props) => {
  return (
    <div className="OrdersTotalAmount">
      {isAllClients ? (
        <span>סה&quot;כ מכירות החודש:</span>
      ) : (
        <span>סה&quot;כ הוצאות לקוח בחודש הזה:</span>
      )}
      <span>&nbsp; {sum} &#8362;</span>
    </div>
  );
};

export default OrdersTotalAmount;
