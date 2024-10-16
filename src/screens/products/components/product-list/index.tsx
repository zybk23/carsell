import { useState, useMemo, useEffect } from "react";
import { IProduct } from "../../../../utils/types";
import { Pagination } from "../../../../shared/pagination";
import { useProductFilter } from "../../hooks/use-product-filter";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import "./style.scss";
import {
  getProductById,
  setCart,
  setTotalPrice,
} from "../../../../store/productSlice";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { cart } = useAppSelector((state) => state.productSlice);

  let itemsPerPage = 12;
  const pages = [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let { filteredProducts } = useProductFilter(setCurrentPage);

  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pages.push(i);
  }

  filteredProducts = useMemo(
    () => filteredProducts.slice(indexOfFirstItem, indexOfLastItem),
    [filteredProducts, indexOfFirstItem, indexOfLastItem]
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalPrice = cart.reduce((total: number, product: IProduct) => {
      return total + Number(product.price) * product.count;
    }, 0);

    dispatch(setTotalPrice(totalPrice));
  }, [cart, dispatch]);

  const handleAddToCart = (item: IProduct) => {
    const isItemExist = cart.find(
      (product: IProduct) => product.id === item.id
    );

    if (isItemExist) {
      const filteredCart = cart.filter(
        (product: IProduct) => product.id !== item.id
      );
      dispatch(setCart(filteredCart));
    } else {
      const copyCart = [...cart];
      copyCart.push({ ...item, count: 1 });
      dispatch(setCart(copyCart));
    }
  };

  const handleOpenDetail = (id: string) => {
    navigate(`/details/${id}`);
    dispatch(getProductById(id));
  };

  return (
    <div className="product-list-container">
      <div className="product-list">
        {filteredProducts.map((item: IProduct) => (
          <div className="product-card" key={item.id}>
            <div
              onClick={() => handleOpenDetail(item.id)}
              className="product-card-container"
            >
              <img src={item.image} alt="" />
              <span className="price">{item.price} ₺</span>
              <span className="name">{item.name}</span>
            </div>
            <div onClick={() => handleAddToCart(item)} className="add-to-cart">
              {cart.find((product: IProduct) => product.id === item.id) ? (
                <span>Remove from Cart</span>
              ) : (
                <span>Add to Cart</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </div>
  );
};
