import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const sameItemInCart = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += 1;

      if (!sameItemInCart) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          name: newItem.title,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      if (sameItemInCart) {
        sameItemInCart.quantity++;
        sameItemInCart.totalPrice = sameItemInCart.totalPrice + newItem.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const sameItemInCart = state.items.find((item) => item.id === id);
      state.totalQuantity -= 1;

      if (sameItemInCart.quantity === 1)
        state.items = state.items.filter((item) => item.id !== id);
      else {
        sameItemInCart.quantity -= 1;
        sameItemInCart.totalPrice -= sameItemInCart.price;
      }
    },
  },
});

export const sendCartData = () => async (dispatch) => {
  dispatch(
    uiActions.showNotification({
      status: "pending",
      title: "Sending...",
      message: "Sending cart date!",
    })
  );

  const sendRequest = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          status: true,
        });
      }, 500)
    );
  };

  const data = await sendRequest();

  if (data.status)
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully!",
      })
    );
  else
    dispatch(
      uiActions.showNotification({
        status: "error",
        title: "Error",
        message: "Sending cart data failed!",
      })
    );
};

export const cartActions = cartSlice.actions;

export default cartSlice;
