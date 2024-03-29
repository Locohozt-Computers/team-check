import React, { useCallback, useEffect, useState } from "react";

import ChangePassword from "components/Auth/ChangePassword";
import { onSubmitActionType } from "components/Auth/SignIn";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { ChangePasswordType } from "types/authTypes";
import { Container, First, Left, Profile, Right, Second, Image } from "./style";
import { errorNotify } from "utils/errorMessage";
import { singleUpload } from "utils/cloudinary/singleUpload";
import UploadImage from "components/ui/Avatar/UploadImage";
import { useAppDispatch, useAppSelector } from "redux/store";
import { authSelector } from "redux/slices/authSlice";
import {
  changePasswordAction,
  updateProfileAction,
} from "redux/slices/authSlice/action";
import { callbackHandler } from "utils/callback";

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const user: any = localStorage.getItem("techCheckPoint");
  const profileId = JSON.parse(user).profile_id;

  const { profile } = useAppSelector(authSelector);

  const [values, setValues] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    gender: "",
    telephone: "",
  });

  const [image, setImage] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);

  const passwordCallback = (response: any) =>
    callbackHandler(response, { successMessage: "Password changed" });

  const updateCallback = (response: any) =>
    callbackHandler(response);

  const onSubmit = async (
    values: ChangePasswordType,
    { setSubmitting, setErrors }: onSubmitActionType
  ) => {
    try {
      setSubmitting(true);
      await dispatch(
        changePasswordAction({ passwords: values, cb: passwordCallback })
      );
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
    }
  };

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

  const handleUpload = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = files?.[0];
    try {
      setImgLoading(true);
      const imageUrl = await singleUpload(file);
      await dispatch(
        updateProfileAction({
          profile: { profile_image_url: imageUrl },
          profileId,
          cb: updateCallback,
        })
      );
      setImage(imageUrl);
      setImgLoading(false);
    } catch (error) {
      setImgLoading(false);
      errorNotify("Something went wrong, try again");
    }
  };

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    await dispatch(
      updateProfileAction({ profile: values, profileId, cb: updateCallback })
    );
    setLoading(false);
    setEnable(false);

    // eslint-disable-next-line
  }, [profile?.provider_id, values]);

  return (
    <HomeLayout>
      <Container>
        <Left>
          <Image>
            <UploadImage
              onChange={handleUpload}
              imageUrl={image ? image : profile?.profile_image_url ?? ""}
              loading={imgLoading}
            />
          </Image>
          <Profile>
            <h1>My Profile</h1>
            {/* <input
              type="text"
              name="username"
              placeholder="Username..."
              value={values.username}
              onChange={handleInput}
            /> */}
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
