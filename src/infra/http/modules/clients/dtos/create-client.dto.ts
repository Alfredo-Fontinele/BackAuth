import * as y from 'yup'

export const createClientDTOSchema = y.object({
  name: y.string().required(),
  email: y.string().email().required(),
  password: y
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      'password must be at least 8 characters long, containing letters, numbers, and at least one symbol',
    ),
  confirm_password: y
    .string()
    .required()
    .oneOf(
      [y.ref('password')],
      // 'password and confirm_passwords must be equals',
    ),
})

export type CreateClientDTO = y.InferType<typeof createClientDTOSchema>
