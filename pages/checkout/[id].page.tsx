import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { GetServerSideProps } from "next";
import { PersonalInfo } from "dh-marvel/components/form/PersonalInfo";
import { Address } from "dh-marvel/components/form/Address";
import { Payment } from "dh-marvel/components/form/CardInformation";

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

const Index = ({ dato }: { dato: Comics }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

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
        number: "4242424242424242",
        cvc: "123",
        expDate: "06/07",
        nameOnCard: "User test",
      },
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

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
      console.log({
        customer: data.customer,
        card: data.card,
        order: {
          name: dato.results[0].title,
          image: dato.results[0].thumbnail.path,
          price: Number(dato.results[0].prices[0].price),
        },
      });

      if (activeStep === steps.length - 1) {
        fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
              number: "4242424242424242",
              cvc: "123",
              expDate: "06/07",
              nameOnCard: "User test",
            },
            order: {
              name: "hola",
              image: "aaaa",
              price: 100,
            },
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
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

  return (
    <Box sx={{ width: "100%" }}>
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
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {steps[activeStep].component}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
      <p>{dato.results[0].title}</p>
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

export default Index;

Index.getLayout = function getLayout(page: any) {
  return <LayoutCheckout>{page}</LayoutCheckout>;
};
