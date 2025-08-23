import { ApiError } from "../types";

export interface SignInRequest {
  email: string;
  password: string;
}

type UserIsNotAcceptedError = {
  message: string;
  errorCode: "USER_NOT_ACCEPTED";
};

type InvalidCredentials = {
  message: string;
  errorCode: "INVALID_CREDENTIALS";
};

export type SignInError = UserIsNotAcceptedError | InvalidCredentials | ApiError;