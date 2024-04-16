export enum SignupIds {
  Email = 'email',
  Password = 'password',
  Username = 'displayName',
}

export const signupInitialValues = {
  [SignupIds.Email]: '',
  [SignupIds.Password]: '',
  [SignupIds.Username]: '',
};
