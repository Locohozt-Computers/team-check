export const truncateText = (text: string, count: number) => {
  return text
    ? text?.length > count
      ? `${text.slice(0, count)}...`
      : text
    : "";
};
