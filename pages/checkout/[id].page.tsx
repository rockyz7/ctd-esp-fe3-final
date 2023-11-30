import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import {
  Stack,
  Alert,
  Snackbar,
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { PersonalInfo } from "dh-marvel/components/form/PersonalInfo";
import { Address } from "dh-marvel/components/form/Address";
import { Payment } from "dh-marvel/components/form/CardInformation";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";

type FormValues = {
  customer: {
    name: string;
    lastname: string;
    email: string;
    address: {
      address1: string;
      address2: string | null;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  card: {
    number: string;
    cvc: string;
    expDate: string;
    nameOnCard: string;
  };
};

export interface Props {
  dato: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comics[];
  };
}

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

const Form = ({ dato }: { dato: Comics }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      customer: {
        name: "User",
        lastname: "Test",
        email: "user@test.com",
        address: {
          address1: "Calle viva 123",
          address2: "",
          city: "Buenos Aires",
          state: "BA",
          zipCode: "1417",
        },
      },
      card: {
        number: "4242 4242 4242 4242",
        cvc: "123",
        expDate: "06/07",
        nameOnCard: "User test",
      },
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const router = useRouter();

  const handleNext = () => {
    handleSubmit(async (data) => {
      // @ts-ignore
      const stepErrors = errors[Object.keys(errors)[activeStep]];

      if (!stepErrors || Object.keys(stepErrors).length === 0) {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }

      if (activeStep === steps.length - 1) {
        fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: data.customer,
            card: data.card,
            order: {
              name: dato.results[0].title,
              image: dato.results[0].thumbnail.path,
              price: Number(dato.results[0].prices[0].price),
            },
          }),
        })
          .then(async (response) => {
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message);
            }
            return response.json();
          })
          .then((apiResponse) => {
            const existingData = localStorage.getItem("orden");

            if (existingData) {
              localStorage.setItem("orden", JSON.stringify(apiResponse));
            } else {
              localStorage.setItem("orden", JSON.stringify(apiResponse));
            }

            router.push("/confirmacion-compra");
          })
          .catch((error) => {
            console.error("Error:", error.message);

            setSnackbarMessage(error.message || "An error occurred.");

            setOpen(true);
          });
      }
    })();
  };

  const steps = [
    {
      label: "Datos personales",
      component: (
        <PersonalInfo
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
        />
      ),
    },
    {
      label: "Dirección de entrega",
      component: (
        <Address
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      ),
    },
    {
      label: "Datos del pago",
      component: (
        <Payment
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      ),
    },
  ];

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const img =
    dato.results[0].thumbnail.path + "." + dato.results[0].thumbnail.extension;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const boxStyle = {
    width: isSmallScreen ? "100%" : "700px",
    // Add other styles as needed...
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",

        padding: "25px",
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        gap: 5,
        margin: "0 auto",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "22px" }}>
        {dato.results[0].title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          gap: 3,
        }}
      >
        <Box sx={boxStyle}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              return (
                <Step key={label.label} {...stepProps}>
                  <StepLabel {...labelProps}>{label.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 3, fontSize: "18px" }}>
                {steps[activeStep].label}
              </Typography>
              {steps[activeStep].component}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Atrás
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Comprar" : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "10px",
            boxShadow: "0px 1px rgba(0, 0, 0)",
          }}
        >
          <Image
            src={img}
            width={150}
            height={150}
            alt={dato.results[0].title}
          />
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: "18px" }}>
              {dato.results[0].title}
            </Typography>
            <Typography sx={{ fontSize: "18px" }}>
              {dato.results[0].prices[0].price === 0 ? "$48" : "$72"}
            </Typography>
          </Box>
        </Box>
      </Box>
      {
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">{snackbarMessage}</Alert>
          </Snackbar>
        </Stack>
      }
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  const res = await fetch(
    `http://gateway.marvel.com/v1/public/comics/${id}?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d`
  );

  const data = await res.json();

  return {
    props: {
      dato: data.data,
    },
  };
};

export default Form;

Form.getLayout = function getLayout(page: any) {
  return <LayoutCheckout>{page}</LayoutCheckout>;
};
