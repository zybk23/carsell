/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { SortBy } from "..";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

const initialState = {
  products: [],
  productById: {},
  brands: [],
  models: [],
  searchField: "",
  selectedBrands: [],
  selectedModels: [],
  sortByType: "lowToHigh",
  cart: [],
  totalPrice: 0,
  isShowCart: false,
};

const store = mockStore({
  productSlice: initialState,
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SortBy />
    </Provider>
  );
};

jest.mock("axios");

describe("Sort-By", () => {
  it("is component rendered", () => {
    render(<AppWrapper />);
    const sourceEl = document.querySelector(".sort-container");
    expect(sourceEl).toBeInTheDocument();
    expect(screen.getByLabelText("Price low to high")).toBeChecked();
    expect(screen.getByLabelText("Price high to low")).not.toBeChecked();
    expect(screen.getByLabelText("New to old")).not.toBeChecked();
    expect(screen.getByLabelText("Old to new")).not.toBeChecked();
  });
  it("is short filter selected", () => {
    const { getByLabelText } = render(<AppWrapper />);
    fireEvent.click(getByLabelText("Price high to low"));
    const state = store.getState();
    expect(state.productSlice.sortByType).toBe("lowToHigh");
  });
});
