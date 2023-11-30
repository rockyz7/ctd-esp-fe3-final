import { render, screen } from "@testing-library/react";
import IndexPage from "dh-marvel/pages/index.page";
import Index from "dh-marvel/pages/index.page";

describe("IndexPage", () => {
  const data = {
    offset: 0,
    limit: 0,
    total: 0,
    count: 0,
    results: [],
  };

  describe("when rendering default", () => {
    it("should render the title", () => {
      render(<Index data={data} />);
      const title = screen.getByText("Comics");
      expect(title).toBeInTheDocument();
    });
  });
});
