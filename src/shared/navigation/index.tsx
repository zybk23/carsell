import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Container from "../container";
import "./style.scss";
import { setIsShowCart, setSearchField } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { totalPrice, isShowCart } = useAppSelector(
    (state) => state.productSlice
  );
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setSearchField(value));
  }, [dispatch, value]);

  const handleShowBasketCard = () => {
    dispatch(setIsShowCart(!isShowCart));
  };

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="navigation-container">
      <Container>
        <div className="navigation-item-container">
          <h1 onClick={handleGoHome}>Eteration</h1>
          <div className="search-area-container">
            <img src={require("../../assets/images/search.png")} alt="" />
            <input
              placeholder="search product"
              type="text"
              className="search-input"
              value={value}
              onChange={handleChange}
            />
          </div>

          <div className="profile-container">
            <div className="basket-container" onClick={handleShowBasketCard}>
              <img src={require("../../assets/images/basket.png")} alt="" />
              <span>₺ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
