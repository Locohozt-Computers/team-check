import React, { useContext } from "react";
import { useFormik } from "formik";
import { AdminContext, CommissionType } from "context/admin/AdminProvider";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { ErrorLabel } from "components/Auth/common/style";
import { Form } from "components/Auth/SignIn/style";
import { errorNotify, successNotify } from "utils/errorMessage";

const SetupCommssion = () => {
  const { setupCommission } = useContext(AdminContext);

  const onSubmit = async (data: CommissionType) => {
    try {
      await setupCommission(data);
      successNotify("Successfully updated");
    } catch (error) {
      errorNotify("Something went wrong, try again");
    }
  };

  const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
    useFormik<CommissionType>({
      initialValues: {
        registration: 0,
        warranty: 0,
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
      <h2>Setup Commission</h2>
      <ErrorLabel textAlign="center">
        {typeof errors === "string" ? errors : null}
      </ErrorLabel>
      <InputWithLabel
        placeholder="Register Fee"
        label="Registration Fee"
        error={touched && errors.registration}
        {...getFieldProps("registration")}
        style={{
          marginBottom: 30,
        }}
      />
      <InputWithLabel
        placeholder="Warranty Fee"
        type="text"
        label="Warranty Fee"
        error={touched && errors.warranty}
        {...getFieldProps("warranty")}
        style={{
          marginBottom: 30,
        }}
      />
      <CustomButton
        testId="signin"
        label={"Submit"}
        type={"submit"}
        disabled={isSubmitting}
        background={isSubmitting ? "#f1f1f7" : "#177BFF"}
        loading={isSubmitting}
      />
    </Form>
  );
};

export default SetupCommssion;
