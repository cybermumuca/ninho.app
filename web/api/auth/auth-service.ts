import { Either, Left, Right } from "@/lib/either";
import { SignInError, SignInRequest, SignUpError, SignUpRequest } from "./types";
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
  
  static async signUp(request: SignUpRequest): Promise<Either<SignUpError, void>> {
    try {
      await api.post("/v1/auth/sign-up", request);

      return Right.create(undefined);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const data = error.response.data as SignUpError;

        if (data.errorCode === "USER_ALREADY_EXISTS") {
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
