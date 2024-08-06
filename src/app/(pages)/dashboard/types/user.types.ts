export type User = {
  sub: number;
  name: string;
  email: string;
  email_verified: boolean;
  emailVerificationToken: string;
  emailVerificationTokenExpiration: string;
  hashedRefreshToken: string;
};
