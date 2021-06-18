import React, { useContext } from "react";

import ChangePassword from "components/Auth/ChangePassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { AuthContext } from "context/auth/AuthProvider";
import { useHistory } from "react-router-dom";
import { ChangePasswordType } from "types/authTypes";
import { Container, First, Left, Profile, Right, Second, Image } from "./style";
import avatar from "assets/images/unisex.jpeg";

const ProfilePage = () => {
  const { changePasswordContext } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (
    values: ChangePasswordType,
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await changePasswordContext(values);
      history.push("/auth/signin");
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };

  return (
    <HomeLayout>
      <Container>
        <Left>
          <Image>
            <img src={avatar} alt="avatar" width="70%" />
          </Image>
          <Profile>
            <h1>My Profile</h1>
            <p>John Doe</p>
            <p>johnd@example.com</p>
            <p>+234 010 234 1234</p>
          </Profile>
        </Left>
        <Right>
          <First></First>
          <Second>
            <ChangePassword onSubmit={onSubmit} />
          </Second>
        </Right>
      </Container>
    </HomeLayout>
  );
};

export default ProfilePage;
