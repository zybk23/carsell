/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { Pagination } from "..";
import { render, fireEvent } from "@testing-library/react";

const defaultProps = {
  currentPage: 2,
  setCurrentPage: jest.fn(),
  pages: [1, 2, 3],
};

describe("Pagination", () => {
  it("is pagination rendered", () => {
    render(<Pagination {...defaultProps} />);
    const el = document.querySelector(".pagination-container");
    expect(el).toBeInTheDocument();
  });
  it("click prev button", () => {
    render(<Pagination {...defaultProps} />);
    const prevEl = document.querySelector(".prev-button-container");
    fireEvent.click(prevEl);
    const pageNum = document.querySelector(".page-number");
    expect(pageNum.textContent).toBe((defaultProps.currentPage - 1).toString());
  });
  it("click next button", () => {
    render(<Pagination {...defaultProps} />);
    const nextEl = document.querySelector(".next-button-container");
    const nextText = document.querySelector(".next-text");
    fireEvent.click(nextEl);
    expect(nextText).toHaveClass("next-text");
  });
});
