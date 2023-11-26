import Faqs from "dh-marvel/components/faqs/faqs";
import { FaqsType, faqsData } from "dh-marvel/components/faqs/faqsData";
import React from "react";

const Index = ({ faqsData }: { faqsData: FaqsType[] }) => {
  return (
    <>
      <Faqs faqs={faqsData} />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      faqsData,
    },
  };
}

export default Index;
