import bcrypt from "bcryptjs";

export async function hashedPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
