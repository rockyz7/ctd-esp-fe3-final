import GrillaComics from "dh-marvel/components/home/GrillaComics";

import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React from "react";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

export interface Props {
  character: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
  };
  comics: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comics[];
  };
}

export interface PropsComic {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Comics[];
}

const Character = ({
  character,
  comics,
}: {
  character: Character;
  comics: PropsComic;
}) => {
  const img =
    character.results[0].thumbnail.path +
    "." +
    character.results[0].thumbnail.extension;

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`${character.results[0].name} Marvel Character`}
        />
      </Head>
      <Box
        sx={{
          padding: " 25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: " center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: " center",
            maxWidth: "600px",
            boxShadow: "0px 1px rgba(0, 0, 0)",
          }}
        >
          <Image
            src={img}
            width={300}
            height={300}
            alt={character.results[0].name}
          />
          <h2>{character.results[0].name}</h2>
          <p>{character.results[0].description}</p>
        </Box>
        <Box
          sx={{
            display: " flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            padding: "25px",
            marginTop: "20px",
            maxWidth: "70%",
          }}
        >
          <Typography
            sx={{ fontSize: "22px", fontWeight: " bold", textAlign: "center" }}
          >
            Comics relacionados
          </Typography>
          <GrillaComics data={comics} />
        </Box>
      </Box>
    </>
  );
};

export default Character;

export type Character = {
  results: [
    {
      id: number;
      name: string;
      description: string;
      thumbnail: {
        path: string;
        extension: string;
      };
      comics: {};
    }
  ];
};

export type Comics = {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  const character = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${id}?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d`
  );

  const characterDetails = await character.json();

  const comics = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d&limit=6`
  );

  const characterComics = await comics.json();

  return {
    props: {
      character: characterDetails.data,
      comics: characterComics.data,
    },
  };
};
