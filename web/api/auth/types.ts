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

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type UserAlreadyExistsError = {
  message: string;
  errorCode: "USER_ALREADY_EXISTS";
};

export type SignUpError = UserAlreadyExistsError | ApiError;
