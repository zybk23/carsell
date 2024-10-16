import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Cart } from "../../products/components/cart";
import Container from "../../../shared/container";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  getProductById,
  setCart,
  setTotalPrice,
} from "../../../store/productSlice";
import { IProduct } from "../../../utils/types";

import "./style.scss";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { productById, cart } = useAppSelector((state) => state.productSlice);

  const handleAddToCart = () => {
    const isItemExist = cart.find((product: IProduct) => product.id === id);

    if (isItemExist) {
      const filteredCart = cart.filter(
        (product: IProduct) => product.id !== id
      );
      dispatch(setCart(filteredCart));
    } else {
      const copyCart = [...cart];
      copyCart.push({ ...productById, count: 1 });
      dispatch(setCart(copyCart));
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalPrice = cart.reduce((total: number, product: IProduct) => {
      return total + Number(product.price) * product.count;
    }, 0);

    dispatch(setTotalPrice(totalPrice));
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getProductById(id as string));
  }, [dispatch, id]);

  return (
    <div className="detail-screen">
      <Container>
        <div className="detail-container">
          <div className="detail">
            <img src={productById.image} alt="" />
            <div className="detail-info">
              <span className="name">{productById.name}</span>
              <span className="price">{productById.price}₺</span>
              <div onClick={handleAddToCart} className="add-to-cart">
                {cart.find(
                  (product: IProduct) => product.id === productById.id
                ) ? (
                  <span>Remove from Cart</span>
                ) : (
                  <span>Add to Cart</span>
                )}
              </div>
              <span className="description">{productById.description}</span>
            </div>
          </div>
          <Cart />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
