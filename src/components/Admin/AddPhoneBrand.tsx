import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { AdminContext, PhoneBrandType } from "context/admin/AdminProvider";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { ErrorLabel } from "components/Auth/common/style";
import { Form } from "components/Auth/SignIn/style";
import { successNotify } from "utils/errorMessage";
import CustomSelect from "components/ui/CustomSelect";
import { authErrorHandler } from "utils/CatchErrors";

const AddPhoneBrand = () => {
  const { addPhoneBrand: addPhoneBrandFunc } = useContext(AdminContext);

  const [operatingSystem, setOperatingSystem] = useState(1);

  const onSubmit = async (data: PhoneBrandType) => {
    try {
      await addPhoneBrandFunc(data);
      successNotify("Successfully updated");
    } catch (error) {
      authErrorHandler(error);
    }
  };

  const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
    useFormik<PhoneBrandType>({
      initialValues: {
        operating_system_id: operatingSystem,
        name: "",
        prefix: "",
      },
      onSubmit,
    });

  const options = [
    { id: 1, label: "Android", value: 1 },
    { id: 2, label: "IOS", value: 2 },
  ];

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
      <h2>Add Phone Brand</h2>
      <ErrorLabel textAlign="center">
        {typeof errors === "string" ? errors : null}
      </ErrorLabel>
      <CustomSelect
        label="Operating System"
        onChange={(value: number) => setOperatingSystem(value)}
        options={options}
        style={{
          marginBottom: 30,
        }}
      />
      <InputWithLabel
        placeholder="Brand Name"
        type="text"
        label="Brand Name"
        error={touched && errors.name}
        {...getFieldProps("name")}
        style={{
          marginBottom: 30,
        }}
      />
      <InputWithLabel
        placeholder="Prefix"
        type="text"
        label="Prefix"
        error={touched && errors.name}
        {...getFieldProps("prefix")}
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

export default AddPhoneBrand;
