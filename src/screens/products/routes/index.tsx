import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getProducts } from "../../../store/productSlice";
import { SortBy } from "../components/filters/sort-by";
import "./style.scss";
import { Brands } from "../components/filters/brands";
import { Model } from "../components/filters/model";
import { ProductList } from "../components/product-list";
import { Cart } from "../components/cart";
import Container from "../../../shared/container";

const Products = () => {
  const dispatch = useAppDispatch();

  const handleGetData = useCallback(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);
  return (
    <div className="layout-container">
      <Container>
        <div className="layout-item-container">
          <div className="filter-container">
            <SortBy />
            <Brands />
            <Model />
          </div>
          <ProductList />
          <Cart />
        </div>
      </Container>
    </div>
  );
};

export default Products;
