export type SignupUserType = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  referral_id: string;
  ip_address: string;
  walletBalance?: number;
  role_id: any;
  id?: number | string;
  profile_id?: string;
};

export type UserType = {
  address: string | null;
  bio: string | null;
  created_at: string;
  gender: string | null;
  id: string;
  ip_address: string;
  is_active: boolean;
  latitude: string | null;
  location: string | null;
  longitude: string | null;
  profile_image_url: string | null;
  provider_id: string;
  provider_name: string;
  telephone: string | null;
  theme: boolean;
  user: {
    created_at: string;
    email: string;
    email_verified_at: string;
    username: string;
    updated_at: string;
  };
  user_id: 18;
  walletBalance: number;
  role_id: number;
};

export type SigninUserType = Pick<SignupUserType, "email" | "password">;

export type ChangePasswordType = {
  new_password: string;
  current_password: string;
};
