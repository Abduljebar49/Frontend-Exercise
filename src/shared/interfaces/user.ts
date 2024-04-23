interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic(optional: string): string;
  isBuyer: boolean;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  token: string;
  isVerified: boolean;
}

interface IUserInput {
  firstName: string;
  lastName: string;
  address: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicUri: string;
  isBuyer: boolean;
}

interface IUserData {
  address: string;
  email: string;
  firstName: string;
  isBuyer: boolean;
  lastName: string;
  profilePic: string;
  userName: string;
  _id: number;
}

interface LoginInput {
  email: string;
  password: string;
}
