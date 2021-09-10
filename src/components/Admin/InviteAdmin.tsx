import React, { useContext } from "react";
import { useFormik } from "formik";
import { AdminContext, InviteAdminType } from "context/admin/AdminProvider";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { ErrorLabel } from "components/Auth/common/style";
import { Form } from "components/Auth/SignIn/style";
import { errorNotify, successNotify } from "utils/errorMessage";

const InviteAdmin = () => {
  const { inviteAdmin } = useContext(AdminContext);

  const onSubmit = async (data: InviteAdminType) => {
    try {
      await inviteAdmin(data);
      successNotify("Successfully invited an admin");
    } catch (error) {
      errorNotify("Something went wrong, try again");
    }
    // alert(JSON.stringify(data, null, 4));
  };

  const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
    useFormik<InviteAdminType>({
      initialValues: {
        username: "",
        email: "",
      },
      onSubmit,
    });
  return (
    <Form
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        boxShadow: "none",
        borderRadius: 0,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      data-testid="sign-in-form"
    >
      <h2>Invite Admin</h2>
      <ErrorLabel textAlign="center">
        {typeof errors === "string" ? errors : null}
      </ErrorLabel>
      <InputWithLabel
        placeholder="Username"
        label="Username"
        error={touched && errors.username}
        {...getFieldProps("username")}
        style={{
          marginBottom: 30,
        }}
      />
      <InputWithLabel
        placeholder="Email Address"
        type="text"
        label="Email Address"
        error={touched && errors.email}
        {...getFieldProps("email")}
        style={{
          marginBottom: 30,
        }}
      />
      <CustomButton
        testId="signin"
        label={"Invite admin"}
        type={"submit"}
        disabled={isSubmitting}
        background={isSubmitting ? "#f1f1f7" : "#177BFF"}
        loading={isSubmitting}
      />
    </Form>
  );
};

export default InviteAdmin;
