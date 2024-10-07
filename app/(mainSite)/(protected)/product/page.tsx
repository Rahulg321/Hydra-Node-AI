import HeroSection from "@/components/sections/product/HeroSection";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description:
    "View our Product, find all the different exams available for you to take!!",
};

const ProductsPage = async () => {
  return (
    <React.Fragment>
      <HeroSection />
    </React.Fragment>
  );
};

export default ProductsPage;
