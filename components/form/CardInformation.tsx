import { TextField, Stack, Box } from "@mui/material";

export const Payment: React.FC<{
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: any;
  errors: any;
  handleSubmit: any;
}> = ({ onSubmit, register, errors, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2} width={"100%"}>
      <TextField
        label="Nombre como aparece en la tarjeta"
        type="text"
        {...register("card.nameOnCard", {
          required: "Card name is required",
        })}
        error={!!errors?.card?.nameOnCard}
        helperText={errors.card?.nameOnCard?.message}
      />
      <TextField
        label="Número de tarjeta"
        type="text"
        {...register("card.number", {
          required: "Card number is required",
        })}
        error={!!errors?.card?.number}
        helperText={errors.card?.number?.message}
      />
      <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
        <TextField
          sx={{ width: "50%", display: "flex", justifySelf: "start" }}
          label="Exp MM/YY"
          type="text"
          {...register("card.expDate", {
            required: "Expiration date is required",
          })}
          error={!!errors?.card?.expDate}
          helperText={errors.card?.expDate?.message}
        />
        <TextField
          sx={{ width: "50%", display: "flex", justifySelf: "end" }}
          label="CVC"
          type="password"
          {...register("card.cvc", {
            required: "CVC is required",
          })}
          error={!!errors?.card?.cvc}
          helperText={errors.card?.cvc?.message}
        />
      </Box>
    </Stack>
  </form>
);
