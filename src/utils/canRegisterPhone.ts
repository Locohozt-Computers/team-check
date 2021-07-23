import { RegisterValueType } from "pages/RegisteredPhonesPage/RegisterPhoneFormPage";

export const canRegisterPhone = (values: RegisterValueType) => {
    console.log(values)
  if (!values.agent_id) {
    return true;
  }
  if (!values.amount) {
    return true;
  }
  if (!values.battery) {
    return true;
  }
  if (!values.brand_id) {
    return true;
  }
  if (!values.card_slot) {
    return true;
  }
  if (!values.category_id) {
    return true;
  }
  if (!values.color_id) {
    return true;
  }
  if (!values.condition_id) {
    return true;
  }
  if (!values.images.length) {
    return true;
  }
  if (!values.internal_storage) {
    return true;
  }
  if (!values.lga_id) {
    return true;
  }
  if (!values.main_camera) {
    return true;
  }
  if (!values.operating_system_id) {
    return true;
  }
  if (!values.phone_model_id) {
    return true;
  }
  if (!values.ram_size_id) {
    return true;
  }
  if (!values.resolution) {
    return true;
  }
  if (!values.screen_size_id) {
    return true;
  }
  if (!values.selfie_camera) {
    return true;
  }
  if (!values.sim) {
    return true;
  }
  if (!values.state_id) {
    return true;
  }
  if (!values.user_id) {
    return true;
  }

  return false;
};
