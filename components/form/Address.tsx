import { TextField, Stack, Box } from "@mui/material";

export const Address: React.FC<{
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: any;
  errors: any;
  handleSubmit: any;
}> = ({ onSubmit, register, errors, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2} width={"100%"}>
      <TextField
        label="Dirección y número"
        type="text"
        {...register("customer.address.address1", {
          required: "Address is required",
        })}
        error={!!errors?.customer?.address?.address1}
        helperText={errors.customer?.address?.address1?.message}
      />
      <TextField
        label="Departamento, piso, etc"
        type="text"
        {...register("customer.address.address2")}
        error={!!errors?.customer?.address?.address2}
        helperText={errors.customer?.address?.address2?.message}
      />
      <TextField
        label="Ciudad"
        type="text"
        {...register("customer.address.city", {
          required: "City is required",
        })}
        error={!!errors?.customer?.address?.city}
        helperText={errors.customer?.address?.city?.message}
      />
      <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
        <TextField
          sx={{ width: "50%", display: "flex", justifySelf: "start" }}
          label="Provincia"
          type="text"
          {...register("customer.address.state", {
            required: "State is required",
          })}
          error={!!errors?.customer?.address?.state}
          helperText={errors.customer?.address?.state?.message}
        />
        <TextField
          sx={{ width: "50%", display: "flex", justifySelf: "end" }}
          label="Cod Postal"
          type="text"
          {...register("customer.address.zipCode", {
            required: "Zip code is required",
          })}
          error={!!errors?.customer?.address?.zipCode}
          helperText={errors.customer?.address?.zipCode?.message}
        />
      </Box>
    </Stack>
  </form>
);
