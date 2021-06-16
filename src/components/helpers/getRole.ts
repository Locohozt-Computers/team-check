export const isArrayFunc = (role: string[]) => {
  return isNaN(parseInt(role[0])) ? -1 : parseInt(role[0]);
};

export const isNotArrayFunc = (role: any) => {
  return isNaN(parseInt(role)) ? -1 : parseInt(role);
};

export const getRole = (role_id: string[] | any) => {
  return role_id.length > 1
    ? -1
    : Array.isArray(role_id)
    ? isArrayFunc(role_id)
    : isNotArrayFunc(role_id);
};
