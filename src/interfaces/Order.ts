// date: "2022-07-01T07:32:00.000Z"
// firstName: "רון"
// lastName: "וולקון"
// pricePerProduct: 4
// productName: "קרטיב"
// quantity: 1
// total: 4
// _id: "62bea331b486d50004593afd"

export interface Order {
  _id: string;
  date: string;
  firstName: string;
  lastName: string;
  pricePerProduct: number;
  productName: string;
  quantity: number;
  total: number;
}
