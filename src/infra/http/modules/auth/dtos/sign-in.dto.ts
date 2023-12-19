import * as y from 'yup'

export const signInDTOSchema = y.object({
  email: y.string().email().required(),
  password: y
    .string()
    .required()
    .matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, {
      message:
        'password must be at least 8 characters long, including 2 special characters, 2 numbers, and 2 uppercase letters.',
    }),
})

export type SignInDTO = y.InferType<typeof signInDTOSchema>
