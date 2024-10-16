import React from "react";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import "./style.scss";
import { setSortByType } from "../../../../../store/productSlice";

export const SortBy = () => {
  const dispatch = useAppDispatch();
  const sortByType = useAppSelector((state) => state.productSlice.sortByType);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSortByType(e.target.value));
  };
  return (
    <div className="sort-container">
      <span className="title">Sorting</span>
      <div className="sort-card" onChange={onChangeValue}>
        <div className="item-container">
          <input
            className="radio"
            type="radio"
            value="lowToHigh"
            checked={sortByType === "lowToHigh"}
            onChange={() => {}}
            name="radioFilter"
            id="lowToHigh"
          />
          <label htmlFor="lowToHigh" className="text">
            Price low to high
          </label>
        </div>
        <div className="item-container">
          <input
            className="radio"
            type="radio"
            value="highToLow"
            name="radioFilter"
            id="highToLow"
          />
          <label htmlFor="highToLow" className="text">
            Price high to low
          </label>
        </div>
        <div className="item-container">
          <input
            className="radio"
            type="radio"
            value="newToOld"
            name="radioFilter"
            id="newToOld"
          />
          <label htmlFor="newToOld" className="text">
            New to old
          </label>
        </div>
        <div className="item-container">
          <input
            className="radio"
            type="radio"
            value="oldToNew"
            name="radioFilter"
            id="oldToNew"
          />
          <label htmlFor="oldToNew" className="text">
            Old to new
          </label>
        </div>
      </div>
    </div>
  );
};
