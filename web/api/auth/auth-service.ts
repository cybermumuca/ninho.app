import { Either, Left, Right } from "@/lib/either";
import { SignInError, SignInRequest } from "./types";
import { api } from "..";
import { isAxiosError } from "axios";

export class AuthService {
  static async signIn(request: SignInRequest): Promise<Either<SignInError, void>> {
    try {
      await api.post("/v1/auth/sign-in", request);

      return Right.create(undefined);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const data = error.response.data as SignInError;

        if (data.errorCode === "USER_NOT_ACCEPTED" || data.errorCode === "INVALID_CREDENTIALS") {
          return Left.create({
            message: data.message,
            errorCode: data.errorCode,
          });
        }
      }

      return Left.create({
        message: "Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.",
        errorCode: "UNEXPECTED_ERROR",
      });
    }
  }
}
