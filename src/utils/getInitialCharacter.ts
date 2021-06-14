import { SignupUserType } from "types/authTypes";

export const getInitialCharacter = (user: Partial<SignupUserType>) => {
  if (Boolean(user)) {
    const { username, email } = user;
    if (username) {
      return username.toUpperCase()[0];
    }
    return email?.toUpperCase()[0];
  }

  return null;
};
