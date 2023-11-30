import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Confirmacion = () => {
  const existingDataString = localStorage.getItem("orden");
  //@ts-ignore
  const existingData = JSON.parse(existingDataString);
  const img = existingData?.data.order?.image + ".jpg";
  console.log(existingData);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "60%" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            boxShadow: "0px 1px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h2"
            fontSize="22px"
            sx={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Que disfrutes tu compra
          </Typography>
          <Image
            src={img}
            width={250}
            height={300}
            alt={existingData?.data?.order?.price.title}
          />
          <Typography variant="h1" fontSize="22px">
            {existingData?.data?.order?.name}
          </Typography>
          <Typography>{existingData?.data?.order?.price}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            width: "100%",
            justifyContent: "space-evenly",
            boxShadow: "0px 1px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", mb: "20px" }}
            >
              Datos personales
            </Typography>
            <Typography>{existingData?.data?.customer.name}</Typography>
            <Typography>{existingData?.data?.customer.email}</Typography>
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", mb: "20px" }}
            >
              Dirección de entrega
            </Typography>
            <Typography>
              {existingData?.data?.customer.address?.address1}
            </Typography>
            <Typography>
              {existingData?.data?.customer.address?.address2}
            </Typography>

            <Typography>
              {existingData?.data?.customer.address.city},{" "}
              {existingData?.data?.customer.address.state} (
              {existingData?.data?.customer.address.zipCode})
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Confirmacion;
