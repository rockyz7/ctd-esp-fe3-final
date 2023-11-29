import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ComicDetails = ({ data }: { data: Comics }) => {
  const img =
    data.results[0].thumbnail.path + "." + data.results[0].thumbnail.extension;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          padding: "20px",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "26px", fontWeight: "bold" }}>
          {data.results[0].title}
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              padding: "20px",
              boxShadow: "0px 1px rgba(0, 0, 0)",
            }}
          >
            <Image src={img} width={250} height={385} />
            <Box
              sx={{
                padding: "0 25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                {data.results[0].title}
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {data.results[0].prices[0].price}
                <Link href={`/checkout/${data.results[0].id}`}>
                  <Button variant="contained" sx={{ width: "100%" }}>
                    Comprar
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: "80%" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {data.results[0].description !== " " &&
                  "There is no description for this comic"}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Characters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {data.results[0].characters.items.length > 0
                  ? data.results[0].characters.items.map((ch) => (
                      <Typography>
                        <Link
                          href={`/personajes/${ch.resourceURI.split("/")[6]}`}
                        >
                          {ch.name}
                        </Link>
                      </Typography>
                    ))
                  : "There are not characters for this comic"}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export type Comics = {
  results: [
    {
      id: number;
      title: string;
      description: string;
      thumbnail: {
        path: string;
        extension: string;
      };
      prices: [
        {
          type: string;
          price: number;
        },
        {
          type: string;
          price: number;
        }
      ];
      characters: {
        items: [
          {
            name: string;
            resourceURI: string;
          }
        ];
      };
    }
  ];
};

export interface ComicProps {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comics[];
  };
}

export const getServerSideProps: GetServerSideProps<ComicProps> = async (
  context
) => {
  const { id } = context.query;

  const res = await fetch(
    `http://gateway.marvel.com/v1/public/comics/${id}?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d`
  );

  const data = await res.json();

  return {
    props: {
      data: data.data,
    },
  };
};

export default ComicDetails;
