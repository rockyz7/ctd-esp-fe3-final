import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import { Comics } from "dh-marvel/pages/index.page";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ComicProp {
  info: Comics;
}

const Item = styled(Paper)(() => ({
  backgroundColor: "#fff",

  padding: "5px",
  textAlign: "center",
  color: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
  width: "400px",
  height: "350px",
  margin: "5px",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  boxShadow: " 2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  gap: "5px",
}));

const Comic: NextPage<ComicProp> = ({ info }) => {
  const img = info.thumbnail.path + "." + info.thumbnail.extension;
  return (
    <Grid
      xs={2}
      sm={4}
      md={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Item>
        <Image src={img} width={190} height={240} />
        <Typography>{info.title}</Typography>

        <Box>
          <Link href={`/checkout/${info.id}`}>
            <Button variant="text">Comprar</Button>
          </Link>
          <Link href={`/comics/${info.id}`}>
            <Button variant="text">Ver detalles</Button>
          </Link>
        </Box>
      </Item>
    </Grid>
  );
};

export default Comic;
