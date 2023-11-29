import { TextField, Stack } from "@mui/material";

export const Address: React.FC<{
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: any;
  errors: any;
  handleSubmit: any;
}> = ({ onSubmit, register, errors, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2} width={400}>
      <TextField
        label="Dirección y número"
        type="text"
        {...register("customer.address.address1", {
          required: "Address is required",
        })}
        error={!!errors?.address?.address1}
        helperText={errors.address?.address1?.message}
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
          required: "Address is required",
        })}
        error={!!errors?.customer?.address?.city}
        helperText={errors.customer?.address?.city?.message}
      />
      <TextField
        label="Provincia"
        type="text"
        {...register("customer.address.state", {
          required: "Address is required",
        })}
        error={!!errors?.customer?.address?.state}
        helperText={errors.customer?.address?.state?.message}
      />
      <TextField
        label="Cod Postal"
        type="text"
        {...register("customer.address.zipCode", {
          required: "Address is required",
        })}
        error={!!errors?.customer?.address?.zipCode}
        helperText={errors.customer?.address?.zipCode?.message}
      />
    </Stack>
  </form>
);
