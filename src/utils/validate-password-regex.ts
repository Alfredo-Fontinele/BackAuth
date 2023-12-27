export const validatedRegexPassword = (password: string) => {
  const validatedRegexExpression =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

  return validatedRegexExpression.test(password)
}
