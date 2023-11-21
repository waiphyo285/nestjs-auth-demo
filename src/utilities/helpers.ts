import * as bcrypt from 'bcrypt';

export class Helpers {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
