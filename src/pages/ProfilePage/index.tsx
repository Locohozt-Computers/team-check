import React, { useCallback, useContext, useEffect, useState } from "react";

import ChangePassword from "components/Auth/ChangePassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { AuthContext } from "context/auth/AuthProvider";
import { useHistory } from "react-router-dom";
import { ChangePasswordType } from "types/authTypes";
import { Container, First, Left, Profile, Right, Second, Image } from "./style";
import avatar from "assets/images/unisex.jpeg";

const ProfilePage = () => {
  const { changePasswordContext, profile, updateProfile } =
    useContext(AuthContext);
  const history = useHistory();

  const user: any = localStorage.getItem("techCheckPoint");
  const profileId = JSON.parse(user).profile_id;

  const [values, setValues] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    gender: "",
    telephone: "",
  });

  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);

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

  // useEffect(() => {
  //   setEnable(false)
  // }, [])

  useEffect(() => {
    setValues({
      username: profile?.user?.username ?? "",
      email: profile?.user?.email ?? "",
      bio: profile?.bio ? profile?.bio : "",
      location: profile?.location ? profile.location : "",
      gender: profile?.gender ? profile?.gender : "",
      telephone: profile?.telephone ? profile?.telephone : "",
    });

    // eslint-disable-next-line
  }, [
    profile?.user?.username,
    profile?.user?.email,
    profile?.bio,
    profile?.gender,
    profile?.location,
    profile?.telephone,
  ]);

  const handleInput = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: value,
    });
    setEnable(true);
  };

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    await updateProfile(values, profileId);
    setLoading(false);
    setEnable(false);

    // eslint-disable-next-line
  }, [profile?.provider_id, values]);

  return (
    <HomeLayout>
      <Container>
        <Left>
          <Image>
            <img src={avatar} alt="avatar" width="70%" />
          </Image>
          <Profile>
            <h1>My Profile</h1>
            <input
              type="text"
              name="username"
              placeholder="Username..."
              value={values.username}
              onChange={handleInput}
            />
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={values?.email}
              onChange={handleInput}
            />
            <input
              type="text"
              name="telephone"
              placeholder="Phone Number..."
              value={values?.telephone}
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Bio..."
              name="bio"
              value={values?.bio}
              onChange={handleInput}
            />
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={values?.location ?? ""}
              onChange={handleInput}
            />
            <input
              type="text"
              name="gender"
              placeholder="Your Gender"
              value={values?.gender ?? ""}
              onChange={handleInput}
            />
            {
              <input
                type="button"
                disabled={!enable}
                style={{
                  backgroundColor: enable ? "dodgerblue" : "#bbbbbb",
                }}
                className="btn"
                value={loading ? "loading..." : "Update"}
                onChange={handleInput}
                onClick={handleUpdate}
              />
            }
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
