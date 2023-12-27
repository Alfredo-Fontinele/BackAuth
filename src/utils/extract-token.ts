export const extractToken = (authorization?: string) => {
  const [type, token] = authorization?.split(' ') ?? []
  return type === 'Bearer' ? token : undefined
}
