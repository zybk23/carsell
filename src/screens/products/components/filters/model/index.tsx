import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import "./style.scss";
import { CheckboxFilter } from "../../../../../shared/checkbox-filter";
import { IFilterItem } from "../../../../../utils/types";
import { setSelectedModels } from "../../../../../store/productSlice";

export const Model = () => {
  const dispatch = useAppDispatch();
  const { models, selectedModels } = useAppSelector(
    (state) => state.productSlice
  );
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filteredModels = useMemo(
    () =>
      models.filter((item: IFilterItem) => {
        return item?.name?.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }),
    [models, value]
  );

  const handleSelectModel = (e: any, item: IFilterItem) => {
    dispatch(setSelectedModels(item));
  };

  return (
    <div className="model-container">
      <span className="title">Model</span>
      <div className="brand-card">
        <input
          className="search-input"
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="search model"
        />
        <div className="card-items-container">
          <CheckboxFilter
            selectedFilters={selectedModels.map((item: IFilterItem) => item.id)}
            handleChange={handleSelectModel}
            data={filteredModels}
          />
        </div>
      </div>
    </div>
  );
};
