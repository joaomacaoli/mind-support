export const phoneMask = (value) => {
  value = value.replace(/\D/g, "");
  value = value.slice(0, 11);
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

export const isValidPhone = (phone) => {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(phone);
};

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum, rest;
  sum = 0;
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf.substring(10, 11));
};

export const cpfMask = (cpf) => {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const isValidBirthDate = (dataNascimento) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(dataNascimento)) {
    return false;
  }

  const [day, month, year] = dataNascimento.split("/").map(Number);
  const dataNascimentoFormatada = new Date(year, month - 1, day);

  if (
    dataNascimentoFormatada.getDate() !== day ||
    dataNascimentoFormatada.getMonth() !== month - 1 ||
    dataNascimentoFormatada.getFullYear() !== year
  ) {
    return false;
  }

  return true;
};

export const birthDateMask = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
};

export const cepMask = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export const isValidCep = (cep) => {
  return /^\d{5}-\d{3}$/.test(cep);
};
