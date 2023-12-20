import { compare, hash } from 'bcrypt'

export class HashService {
  static async hashPassword(password: string, salts: number = 8) {
    return await hash(password, salts)
  }

  static async comparePassword(password: string, hash: string) {
    return await compare(password, hash)
  }
}
