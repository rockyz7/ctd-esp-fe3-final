import { TextField, Stack } from "@mui/material";

type PersonalInfoProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: any;
  errors: any;
  handleSubmit: any;
};

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  onSubmit,
  register,
  errors,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={2} width={"100%"}>
      <TextField
        label="Nombre"
        type="text"
        {...register("customer.name", { required: "Name is required" })}
        error={!!errors?.customer?.name}
        helperText={errors?.customer?.name?.message}
      />
      <TextField
        label="Apellido"
        type="text"
        {...register("customer.lastname", {
          required: "Last name is required",
        })}
        error={!!errors?.customer?.lastname}
        helperText={errors?.customer?.lastname?.message}
      />
      <TextField
        label="E-mail"
        type="email"
        {...register("customer.email", { required: "E-mail is required" })}
        error={!!errors?.customer?.email}
        helperText={errors?.customer?.email?.message}
      />
    </Stack>
  </form>
);
