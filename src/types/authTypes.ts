export type SignupUserType = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    referral_id: string;
    ip_address: string;
    role_id: any;
}

export type SigninUserType = Pick<SignupUserType, 'email' | 'password'>

export type ChangePasswordType = {
    new_password: string;
    current_password: string;
}
