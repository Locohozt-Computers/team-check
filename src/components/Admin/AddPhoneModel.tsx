import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { AdminContext, PhoneModelType } from "context/admin/AdminProvider";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { ErrorLabel } from "components/Auth/common/style";
import { Form } from "components/Auth/SignIn/style";
import { successNotify } from "utils/errorMessage";
import CustomSelect from "components/ui/CustomSelect";
import { authErrorHandler } from "utils/CatchErrors";
import CustomInputTag from "components/ui/CustomInputTag";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";

const AddPhoneModel = () => {
  const { addPhoneModel: addPhoneModelFunc } = useContext(AdminContext);
  const { all_categories, brands, getBrands, getCategories } =
    useContext(RegisterPhoneContext);

  const [battery, setBattery] = useState<string[]>([]);
  const [cardSlot, setCardSlot] = useState<string[]>([]);
  const [displayType, setDisplayType] = useState<string[]>([]);
  const [mainCamera, setMainCamera] = useState<string[]>([]);
  const [resolution, setResolution] = useState<string[]>([]);
  const [selfieCamera, setSelfieCamera] = useState<string[]>([]);
  const [sim, setSim] = useState<string[]>([]);
  const [storage, setStorage] = useState<string[]>([]);

  const [state, setState] = useState({
    name: "",
    brand_id: 0,
    battery: [],
    card_slot: [],
    category_id: 1,
    display_type: [],
    main_camera: [],
    resolution: [],
    selfie_camera: [],
    sim: [],
    storage: [],
    warranty_fee: 0,
  });

  const onSubmit = async (data: PhoneModelType) => {
    try {
      const payload = {
        ...data,
        battery,
        card_slot: cardSlot,
        display_type: displayType,
        main_camera: mainCamera,
        resolution,
        selfie_camera: selfieCamera,
        sim,
        storage,
        brand_id: state.brand_id,
        category_id: state.category_id,
      };
      await addPhoneModelFunc(payload);
      successNotify("Successfully updated");
    } catch (error) {
      authErrorHandler(error);
    }
  };

  const { handleSubmit, errors, touched, isSubmitting, getFieldProps } =
    useFormik<PhoneModelType>({
      initialValues: {
        name: "",
        brand_id: state.brand_id,
        battery,
        card_slot: cardSlot,
        category_id: state.category_id,
        display_type: displayType,
        main_camera: mainCamera,
        resolution,
        selfie_camera: selfieCamera,
        sim,
        storage,
        warranty_fee: state.warranty_fee,
      },
      onSubmit,
    });

  useEffect(() => {
    getBrands();
    getCategories();

    // eslint-disable-next-line
  }, []);

  return (
    <Form
      style={{
        maxWidth: "100%",
        maxHeight: "90vh",
        boxShadow: "none",
        borderRadius: 0,
        overflowY: "auto",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      data-testid="sign-in-form"
    >
      <h2>Add Phone Model</h2>
      <ErrorLabel textAlign="center">
        {typeof errors === "string" ? errors : null}
      </ErrorLabel>
      <InputWithLabel
        placeholder="Model Name"
        type="text"
        label="Model Name"
        error={touched && errors.name}
        {...getFieldProps("name")}
        style={{
          marginBottom: 30,
        }}
      />
      <CustomSelect
        label="Brands"
        onChange={(value: number) => setState({ ...state, brand_id: value })}
        defaultValue="Select Brands"
        options={brands}
        style={{
          marginBottom: 30,
        }}
      />
      <CustomSelect
        label="Category"
        onChange={(value: number) => setState({ ...state, category_id: value })}
        options={all_categories}
        defaultValue="Select Categories"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={battery}
        setTags={setBattery}
        label="Battery"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={cardSlot}
        setTags={setCardSlot}
        label="Card Slot"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={displayType}
        setTags={setDisplayType}
        label="Display Type"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={mainCamera}
        setTags={setMainCamera}
        label="Main Camera"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={resolution}
        setTags={setResolution}
        label="Resolution"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={selfieCamera}
        setTags={setSelfieCamera}
        label="Selfie Camera"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={sim}
        setTags={setSim}
        label="SIM"
        style={{
          marginBottom: 30,
        }}
      />
      <CustomInputTag
        tags={storage}
        setTags={setStorage}
        label="Storage"
        style={{
          marginBottom: 30,
        }}
      />

      <InputWithLabel
        placeholder="Warranty Fee"
        type="text"
        label="Warranty Fee"
        error={touched && errors.warranty_fee}
        {...getFieldProps("warranty_fee")}
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

export default AddPhoneModel;
