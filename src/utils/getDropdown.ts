export const getDropdown = (data: any) => {
  return data?.map((value: string) => ({
    label: value,
    value,
  }));
};
