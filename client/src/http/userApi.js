const { $host } = require("./index");

export const registration = async (email, password) => {
  const { data } = $host.post("api/auth/register", {
    email,
    password,
  });
  console.log(data);
  return data;
};
export const login = async (email, password) => {
  const { data } = $host.post("api/auth/login", {
    email,
    password,
  });
};
