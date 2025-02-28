export const getFirstAndSecondName = (fullName = "") => {
  const names = fullName.split(" ");
  return `${names[0]} ${names[1] || ""}`.trim();
};
