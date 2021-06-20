import { useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  const renderCartDetails = () => {
    if (cartItems.length > 0)
      return `Total: $${cartItems
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2)}`;
    return "No Items";
  };

  return (
    <Card className={classes.cart}>
      <h2>
        Your Shopping Cart <span>{renderCartDetails()}</span>
      </h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
