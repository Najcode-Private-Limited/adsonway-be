import bcrypt from 'bcrypt';

export const comparePassword = async (
   password: string,
   hashedPassword: string
) => {
   const isPasswordValid = await bcrypt.compare(password, hashedPassword);
   return isPasswordValid;
};

export const hashPassword = async (password: string) => {
   const hashedPassword = await bcrypt.hash(password, 10);
   return hashedPassword;
};
