interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic(optional: string): string;
  isBuyer: boolean;
}
