export enum UpdateProfileIds {
  FirstName = 'firstName',
  LastName = 'lastName',
  Username = 'username',
  Address = 'address',
  Email = 'email',
  Phone = 'phone',
  Preferred_Currency = 'preferredCurrency',
}

export const UpdateProfileInitialValues = (email: string) => ({
  [UpdateProfileIds.FirstName]: '',
  [UpdateProfileIds.LastName]: '',
  [UpdateProfileIds.Username]: '',
  [UpdateProfileIds.Phone]: '',
  [UpdateProfileIds.Address]: '',
  [UpdateProfileIds.Email]: email,
  [UpdateProfileIds.Preferred_Currency]: '',
});
