import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import prismaClient from "../../prisma";
import { AuthRequest } from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    if (!email) {
      throw new Error("Email must be passed");
    }

    if (!password) {
      throw new Error("Password must be passed");
    }
    //ver noi BD se existe esse usuário
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = sign(
      {
        name: user?.name,
        email: user?.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user?.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      token: token,
    };
  }
}
export { AuthUserService };
