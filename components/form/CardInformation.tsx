import { TextField, Stack } from "@mui/material";

export const Payment: React.FC<{
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: any;
  errors: any;
  handleSubmit: any;
}> = ({ onSubmit, register, errors, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2} width={400}>
      <TextField
        label="Nombre como aparece en la tarjeta"
        type="text"
        {...register("card.nameOnCard", {
          required: "Address is required",
        })}
        error={!!errors?.card?.nameOnCard}
        helperText={errors.card?.nameOnCard?.message}
      />
      <TextField
        label="Número de tarjeta"
        type="text"
        {...register("card.number", {
          required: "Address is required",
        })}
        error={!!errors?.card?.number}
        helperText={errors.card?.number?.message}
      />
      <TextField
        label="Exp MM/YY"
        type="text"
        {...register("card.expDate", {
          required: "Address is required",
        })}
        error={!!errors?.card?.expDate}
        helperText={errors.card?.expDate?.message}
      />
      <TextField
        label="CVV"
        type="password"
        {...register("card.cvc", {
          required: "Address is required",
        })}
        error={!!errors?.card?.cvc}
        helperText={errors.card?.cvc?.message}
      />
    </Stack>
  </form>
);
