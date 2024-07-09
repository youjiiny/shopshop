import { User as FirebaseUser } from 'firebase/auth';

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
export type User = (FirebaseUser & { isAdmin?: boolean }) | null;
export type AuthContextType = {
  user: User;
  updateUser: (updated: { displayName: string }) => void;
};
export type Receiver = {
  name: string;
  phone1: {
    part1: string;
    part2: string;
    part3: string;
  };
  phone2: {
    part1: string;
    part2: string;
    part3: string;
  };
};
