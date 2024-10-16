import { useMemo, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { IFilterItem, IProduct } from "../../../utils/types";

export const useProductFilter = (setCurrentPage: any) => {
  const { products, searchField, selectedBrands, selectedModels, sortByType } =
    useAppSelector((state) => state.productSlice);

  let filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchField) {
      result = result.filter((item: IProduct) => {
        return (
          item?.name?.toLowerCase().indexOf(searchField.toLowerCase()) !== -1
        );
      });
    }

    if (selectedModels.length > 0) {
      result = result.filter((product: IProduct) => {
        return selectedModels.some((model: IFilterItem) => {
          return model.name === product.model;
        });
      });
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product: IProduct) => {
        return selectedBrands.some((brand: IFilterItem) => {
          return brand.name === product.brand;
        });
      });
    }

    return result;
  }, [products, searchField, selectedModels, selectedBrands]);

  filteredProducts = useMemo(() => {
    let sortedProducts = [...filteredProducts];

    if (sortByType === "lowToHigh") {
      return sortedProducts.sort(
        (a: IProduct, b: IProduct) => Number(a.price) - Number(b.price)
      );
    }

    if (sortByType === "highToLow") {
      return sortedProducts.sort(
        (a: IProduct, b: IProduct) => Number(b.price) - Number(a.price)
      );
    }

    if (sortByType === "newToOld") {
      return sortedProducts.sort(
        (a: IProduct, b: IProduct) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    if (sortByType === "oldToNew") {
      return sortedProducts.sort(
        (a: IProduct, b: IProduct) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return sortedProducts;
  }, [filteredProducts, sortByType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchField, selectedBrands, selectedModels, setCurrentPage, sortByType]);

  return { filteredProducts };
};
