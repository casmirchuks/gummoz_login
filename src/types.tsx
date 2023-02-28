export interface signInType {
  username: string,
  password: string,
}
export interface signUpType {
  username: string,
  email: string,
  password: string
  passwordRepeat: string
}

export interface forgotPasswordType {
  username: string
}
export interface auth {
  signIn: signInType
  signUp: signUpType
  forgotPassword: forgotPasswordType
}

export type RootStackParamList  = {
  Home:   undefined;
  SignIn:  undefined;
  SignUp: undefined;
  ConfirmEmail: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
};