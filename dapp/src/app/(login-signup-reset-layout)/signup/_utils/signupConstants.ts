export enum SignupIds {
  Email = 'email',
  Password = 'password',
  Username = 'displayName',
  ConfirmPassword = 'confirmPassword',
}

export const signupInitialValues = {
  [SignupIds.Email]: '',
  [SignupIds.Password]: '',
  [SignupIds.Username]: '',
  [SignupIds.ConfirmPassword]: '',
};
