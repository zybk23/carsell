import { IProduct } from "../../../../utils/types";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  setCheckout,
  setDecreaseProductCount,
  setIncreaseProductCount,
} from "../../../../store/productSlice";

import "./style.scss";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice, isShowCart } = useAppSelector(
    (state) => state.productSlice
  );

  const handleIncreaseCount = (item: IProduct) => {
    dispatch(setIncreaseProductCount(item));
  };
  const handleDecreaseCount = (item: IProduct) => {
    dispatch(setDecreaseProductCount(item));
  };

  const handleCheckout = () => {
    dispatch(setCheckout());
  };

  if (cart.length === 0) {
    return (
      <div className="warning-container visible-warning">
        <span className="warning">Sepetinizde ürün bulunmamaktadır </span>
      </div>
    );
  }
  return (
    <div className={`cart ${isShowCart ? "visible-cart" : ""}`}>
      <span>Cart</span>
      <div className="cart-container">
        {cart.map((item: IProduct) => (
          <div key={item.id} className="cart-item-container">
            <div className="item-info">
              <span className="name">{item.name}</span>
              <span className="price">{item.price}₺</span>
            </div>
            <div className="item-piece">
              <div
                onClick={() => handleDecreaseCount(item)}
                className="button-container"
              >
                <span>-</span>
              </div>
              <div className="piece-container">
                <span>{item.count}</span>
              </div>
              <div
                onClick={() => handleIncreaseCount(item)}
                className="button-container"
              >
                <span>+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <span>Checkout</span>
      <div className="checkout-container">
        <div className="total-price">
          <span className="text"> Total Price: </span>
          <span className="price"> {totalPrice.toFixed(2)} ₺</span>
        </div>
        <div onClick={handleCheckout} className="checkout-button">
          <span>Checkout</span>
        </div>
      </div>
    </div>
  );
};
