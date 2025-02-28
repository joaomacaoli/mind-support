export const generateDate = () => {
  const start = new Date(1980, 0, 1);
  const end = new Date(2000, 11, 31);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().split("T")[0];
};
