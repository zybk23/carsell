/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { ProductList } from "..";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store"; // Correct import for mock store

const mockProduct = [
  {
    createdAt: "2023-07-17T07:21:02.529Z",
    name: "Bentley Focus",
    image: "https://loremflickr.com/640/480/food",
    price: "51.00",
    description:
      "Quasi adipisci sint veniam delectus. Illum laboriosam minima dignissimos natus earum facere consequuntur eius vero. Itaque facilis at tempore ipsa. Accusamus nihil fugit velit possimus expedita error porro aliquid. Optio magni mollitia veritatis repudiandae tenetur nemo. Id consectetur fuga ipsam quidem voluptatibus sed magni dolore.\nFacilis commodi dolores sapiente delectus nihil ex a perferendis. Totam deserunt assumenda inventore. Incidunt nesciunt adipisci natus porro deleniti nisi incidunt laudantium soluta. Nostrum optio ab facilis quisquam.\nSoluta laudantium ipsa ut accusantium possimus rem. Illo voluptatibus culpa incidunt repudiandae placeat animi. Delectus id in animi incidunt autem. Ipsum provident beatae nisi cumque nulla iure.",
    model: "CTS",
    brand: "Lamborghini",
    id: "1",
  },
];

const initialState = {
  products: mockProduct,
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

jest.mock("axios");

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockStore = configureMockStore();
const store = mockStore({
  productSlice: initialState,
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
};
describe("ProductList", () => {
  it("renders product list and allows adding a product to the cart", () => {
    const { getByText } = render(<AppWrapper />);

    expect(getByText("Bentley Focus")).toBeInTheDocument();
    expect(getByText("51.00 ₺")).toBeInTheDocument();
    fireEvent.click(getByText("Add to Cart"));

    const updatedActions = store.getActions();
    expect(updatedActions).toContainEqual(
      expect.objectContaining({
        type: "product/setCart",
        payload: [{ ...mockProduct[0], count: 1 }],
      })
    );
  });
});
