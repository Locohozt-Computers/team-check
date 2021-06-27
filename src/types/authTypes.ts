export type SignupUserType = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  referral_id: string;
  ip_address: string;
  wallet_balance?: number;
  role_id: any;
  id?: number;
};

export type SigninUserType = Pick<SignupUserType, "email" | "password">;

export type ChangePasswordType = {
  new_password: string;
  current_password: string;
};
