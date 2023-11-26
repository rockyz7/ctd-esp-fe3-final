import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { FaqsType, faqsData } from "./faqsData";
import { Box } from "@mui/material";
import FaqItem from "./faqItem";
import { GetStaticProps } from "next";

interface FaqsProps {
  faqs: FaqsType[];
}

const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
  return (
    <Box sx={{ margin: "20px", maxWidth: "1200px" }}>
      {faqs?.map((faq: FaqsType) => (
        <FaqItem key={faq.id} {...faq} />
      ))}
    </Box>
  );
};

export default Faqs;
