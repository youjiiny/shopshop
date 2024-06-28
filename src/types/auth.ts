export type CompanyUserSignUpType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type Address = {
  zoneCode: string;
  roadAddress: string;
  detailAddress: string;
};
export type User = {
  address?: Address;
};
