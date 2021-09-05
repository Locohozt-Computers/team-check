import React, { useContext } from "react";
import { useFormik } from "formik";
import { AdminContext, WarrantyPeriodType } from "context/admin/AdminProvider";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { ErrorLabel } from "components/Auth/common/style";
import { Form } from "components/Auth/SignIn/style";
import { errorNotify, successNotify } from "utils/errorMessage";

const SetupWarrantyPeriod = () => {
  const { setupWarrantyPeriod } = useContext(AdminContext);

  const onSubmit = async (data: WarrantyPeriodType) => {
    try {
      await setupWarrantyPeriod(data);
      successNotify("Successfully updated");
    } catch (error) {
      errorNotify("Something went wrong, try again");
    }
    // alert(JSON.stringify(data, null, 4));
  };

  const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
    useFormik<WarrantyPeriodType>({
      initialValues: {
        warranty_offset_period: 0,
        warranty_validity: 0,
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
      <h2>Setup Warranty Period</h2>
      <ErrorLabel textAlign="center">
        {typeof errors === "string" ? errors : null}
      </ErrorLabel>
      <InputWithLabel
        placeholder="Warranty offset Period"
        label="Warranty offset Period"
        error={touched && errors.warranty_offset_period}
        {...getFieldProps("warranty_offset_period")}
        style={{
          marginBottom: 30,
        }}
      />
      <InputWithLabel
        placeholder="Warranty Expiry"
        type="text"
        label="Warranty Expiry"
        error={touched && errors.warranty_validity}
        {...getFieldProps("warranty_validity")}
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

export default SetupWarrantyPeriod;
