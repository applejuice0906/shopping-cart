import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/uiSlice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleToggleCart = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button
      title="Click to show/hide a cart"
      className={classes.button}
      onClick={handleToggleCart}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
