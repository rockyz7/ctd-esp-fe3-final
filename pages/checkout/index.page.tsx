import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React from "react";

const Index = () => {
  return <div>Checkout</div>;
};

export default Index;

Index.getLayout = function getLayour(page: any) {
  return <LayoutCheckout>{page}</LayoutCheckout>;
};
