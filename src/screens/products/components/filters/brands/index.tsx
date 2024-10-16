import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import "./style.scss";
import { CheckboxFilter } from "../../../../../shared/checkbox-filter";
import { IFilterItem } from "../../../../../utils/types";
import { setSelectedBrands } from "../../../../../store/productSlice";

export const Brands = () => {
  const dispatch = useAppDispatch();
  const { brands, selectedBrands } = useAppSelector(
    (state) => state.productSlice
  );
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filteredBrands = useMemo(
    () =>
      brands.filter((item: IFilterItem) => {
        return item?.name?.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }),
    [brands, value]
  );

  const handleSelectBrand = (e: any, item: IFilterItem) => {
    dispatch(setSelectedBrands(item));
  };

  return (
    <div className="brand-container">
      <span className="title">Brands</span>
      <div className="brand-card">
        <input
          className="search-input"
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="search brand"
        />
        <CheckboxFilter
          selectedFilters={selectedBrands.map((item: IFilterItem) => item.id)}
          handleChange={handleSelectBrand}
          data={filteredBrands}
        />
      </div>
    </div>
  );
};
