export interface signInType {
  username: string,
  password: string,
}

export interface signUpType {
  username: string,
  email: string,
  password: string
}

export type RootStackParamList  = {
  Home:   undefined;
  SignIn:  undefined;
  SignUp: undefined;
  ConfirmEmail: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
};