/* eslint-disable testing-library/no-node-access */
import Container from "..";
import { render } from "@testing-library/react";

describe("Container", () => {
  it("is container rendered", () => {
    render(<Container />);
    const el = document.querySelector(".container");
    expect(el).toBeInTheDocument();
  });
});
