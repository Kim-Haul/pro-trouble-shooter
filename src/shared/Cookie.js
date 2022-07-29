import { Cookies } from "react-cookie";

const cookies = new Cookies();

const getCookie = () => {
  if (cookies.get("Authorization")) {
    return cookies.get("Authorization").substr(7);
  } else {
    return null;
  }
};

const setCookie = (token, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
  document.cookie = `Authorization=${token}; expires=${date}; path=/`;
};

// const deleteCookie = () => {
//   cookies.remove("Authorization");
// };

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);
  document.cookie = name + "=; expires=" + date + "; path=/";
  window.location.reload();
};

export { getCookie, setCookie, deleteCookie };
