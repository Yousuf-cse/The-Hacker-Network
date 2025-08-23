import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export const comparePassword = async (
  inputPassword: string,
  dbPassword: string
): Promise<boolean> => {
  const compare = await bcrypt.compare(inputPassword, dbPassword);

  // console.log("Password Bcrypt Comparison", compare);

  if (compare) return true;
  else return false;
};

export const generateJWT = async (
  jwtPayload: Record<string, unknown>
): Promise<string> => {
  const jwtToken = jwt.sign(
    {
      ...jwtPayload,
    },
    process.env.JWT_KEY as Secret,
    {
      expiresIn: "1y",
    }
  );

  return jwtToken;
};
