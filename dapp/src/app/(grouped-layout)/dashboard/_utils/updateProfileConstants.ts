export enum UpdateProfileIds {
  FirstName = 'firstName',
  LastName = 'lastName',
  Username = 'username',
  Address = 'address',
  Email = 'email',
  Phone = 'phone',
  Twitter = 'twitter',
  Preferred_Currency = 'preferredCurrency',
}

export const UpdateProfileInitialValues = (email: string) => ({
  [UpdateProfileIds.FirstName]: '',
  [UpdateProfileIds.LastName]: '',
  [UpdateProfileIds.Username]: '',
  [UpdateProfileIds.Phone]: '',
  [UpdateProfileIds.Address]: '',
  [UpdateProfileIds.Email]: email,
  [UpdateProfileIds.Twitter]: '',
  [UpdateProfileIds.Preferred_Currency]: '',
});
