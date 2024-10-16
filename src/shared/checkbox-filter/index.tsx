import React from "react";
import "./style.scss";
import { IFilterItem } from "../../utils/types";

export interface ICheckboxFilter {
  data: IFilterItem[];
  selectedFilters: number[];
  handleChange: (e: any, item: IFilterItem) => void;
}

export const CheckboxFilter = ({
  data,
  selectedFilters,
  handleChange,
}: ICheckboxFilter) => {
  return (
    <div className="card-items-container">
      {data.map((item: IFilterItem) => (
        <div className="filter-items" key={item.id}>
          <input
            className="checkbox"
            checked={selectedFilters.includes(item.id)}
            onChange={(e) => handleChange(e, item)}
            type="checkbox"
            id="checkbox"
          />
          <label htmlFor="checkbox" className="text">
            {item.name}
          </label>
          <label htmlFor="checkbox" className="count">
            {"(" + item.count + ")"}
          </label>
        </div>
      ))}
    </div>
  );
};
