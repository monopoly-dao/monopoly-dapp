export enum LoginIds {
  Email = 'email',
  Password = 'password',
}

export const loginInitialValues = {
  [LoginIds.Email]: '',
  [LoginIds.Password]: '',
};
