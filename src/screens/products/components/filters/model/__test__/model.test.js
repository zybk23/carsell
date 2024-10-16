/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { Model } from "..";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

const mockModels = [
  { id: "1", name: "Model A" },
  { id: "2", name: "Model B" },
  { id: "3", name: "Model C" },
];

const initialState = {
  products: [],
  productById: {},
  brands: [],
  models: mockModels,
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
      <Model />
    </Provider>
  );
};

jest.mock("axios");

describe("Model", () => {
  it("renders correctly with initial models", () => {
    render(<AppWrapper />);
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("search model")).toBeInTheDocument();
  });

  it("filters models based on input", () => {
    render(<AppWrapper />);
    const searchInput = screen.getByPlaceholderText("search model");

    fireEvent.change(searchInput, { target: { value: "A" } });

    expect(screen.getByText("Model A")).toBeInTheDocument();
    expect(screen.queryByText("Model B")).not.toBeInTheDocument();
    expect(screen.queryByText("Model C")).not.toBeInTheDocument();
  });

  it("dispatches setSelectedModels when a checkbox is selected", () => {
    const { getByPlaceholderText } = render(<AppWrapper />);
    const searchInput = getByPlaceholderText("search model");

    fireEvent.change(searchInput, { target: { value: "A" } });
    fireEvent.click(screen.getByLabelText("Model A"));

    const state = store.getState();
    expect(state.productSlice.selectedModels).toEqual([]);
  });
});
