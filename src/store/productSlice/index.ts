import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IFilterItem, IProduct } from "../../utils/types";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await axios.get(
    ` https://5fc9346b2af77700165ae514.mockapi.io/products`
  );

  return response.data;
});

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: string) => {
    const response = await axios.get(
      ` https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
    );

    return response.data;
  }
);

export interface stateType {
  products: IProduct[];
  productById: IProduct;
  brands: IFilterItem[];
  selectedBrands: IFilterItem[];
  models: IFilterItem[];
  selectedModels: IFilterItem[];
  searchField: string;
  sortByType: string;
  totalPrice: number;
  isShowCart: boolean;
  cart: IProduct[];
}

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productById: {} as IProduct,
    brands: [],
    models: [],
    searchField: "",
    selectedBrands: [],
    selectedModels: [],
    sortByType: "lowToHigh",
    cart: JSON.parse(localStorage.getItem("cart") as string) || [],
    totalPrice: 0,
    isShowCart: false,
  },
  reducers: {
    setSearchField: (state: stateType, action: PayloadAction<string>) => {
      state.searchField = action.payload;
    },
    setSortByType: (state: stateType, action: PayloadAction<string>) => {
      state.sortByType = action.payload;
    },
    setCart: (state: stateType, action: PayloadAction<IProduct[]>) => {
      state.cart = action.payload;
    },
    setIsShowCart: (state: stateType, action: PayloadAction<boolean>) => {
      state.isShowCart = action.payload;
    },
    setTotalPrice: (state: stateType, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    setCheckout: (state: stateType) => {
      state.totalPrice = 0;
      state.cart = [];
    },
    setIncreaseProductCount: (
      state: stateType,
      action: PayloadAction<IProduct>
    ) => {
      const increasedProductIndex = state.cart.findIndex(
        (obj) => obj.id === action.payload.id
      );

      state.cart[increasedProductIndex].count += 1;
    },
    setDecreaseProductCount: (
      state: stateType,
      action: PayloadAction<IProduct>
    ) => {
      const decreasedProductIndex = state.cart.findIndex(
        (obj) => obj.id === action.payload.id
      );

      if (state.cart[decreasedProductIndex].count === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      } else {
        state.cart[decreasedProductIndex].count -= 1;
      }
    },
    setSelectedBrands: (
      state: stateType,
      action: PayloadAction<IFilterItem>
    ) => {
      let modifiedSelectedBrands = [...state.selectedBrands];
      const exist = modifiedSelectedBrands.find(
        (item) => item.id === action.payload.id
      );
      if (exist) {
        modifiedSelectedBrands = modifiedSelectedBrands.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        modifiedSelectedBrands.push(action.payload);
      }
      state.selectedBrands = modifiedSelectedBrands;
    },
    setSelectedModels: (
      state: stateType,
      action: PayloadAction<IFilterItem>
    ) => {
      let modifiedSelectedModels = [...state.selectedModels];
      const exist = modifiedSelectedModels.find(
        (item) => item.id === action.payload.id
      );
      if (exist) {
        modifiedSelectedModels = modifiedSelectedModels.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        modifiedSelectedModels.push(action.payload);
      }
      state.selectedModels = modifiedSelectedModels;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<stateType>) => {
    builder.addCase(
      getProducts.fulfilled,
      (state: stateType, action: PayloadAction<IProduct[]>) => {
        const brands = action.payload.map((item) => item.brand);
        const models = action.payload.map((item) => item.model);

        const uniqBrands = brands
          .filter((value, index, array) => array.indexOf(value) === index)
          .sort();
        const uniqModels = models
          .filter((value, index, array) => array.indexOf(value) === index)
          .sort();

        function CountSameElementInArray(arr: string[]) {
          const countElement = [];
          arr.sort();

          var current = null;
          var cnt = 0;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== current) {
              if (cnt > 0) {
                countElement.push(cnt);
              }
              current = arr[i];
              cnt = 1;
            } else {
              cnt++;
            }
          }
          if (cnt > 0) {
            countElement.push(cnt);
          }
          return countElement;
        }

        const countBrands = CountSameElementInArray(brands as string[]);
        const countModels = CountSameElementInArray(models as string[]);

        const allBrandsWithCount = [];
        const allModelsWithCount = [];

        for (let i = 0; i < uniqBrands.length; i++) {
          allBrandsWithCount.push({
            id: i + 1,
            name: uniqBrands[i],
            count: countBrands[i],
          });
        }

        for (let i = 0; i < uniqModels.length; i++) {
          allModelsWithCount.push({
            id: i + 1,
            name: uniqModels[i],
            count: countModels[i],
          });
        }

        state.brands = allBrandsWithCount as IFilterItem[];
        state.models = allModelsWithCount as IFilterItem[];

        state.products = action.payload;
      }
    );
    builder.addCase(
      getProductById.fulfilled,
      (state: stateType, action: PayloadAction<IProduct>) => {
        state.productById = action.payload;
      }
    );
  },
});

export const {
  setSearchField,
  setSelectedBrands,
  setSelectedModels,
  setSortByType,
  setCart,
  setIncreaseProductCount,
  setTotalPrice,
  setDecreaseProductCount,
  setCheckout,
  setIsShowCart,
} = productSlice.actions;

export default productSlice.reducer;
