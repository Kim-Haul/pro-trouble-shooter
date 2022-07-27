import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "../../shard/Cookie";

// Actions
const LOAD = "user_reducer/LOAD";

// 초기값 설정
const initialState = {
  isAuth: false,
  token: "3ej3k14j5j",
};

// Action Creators
export function loadUser(userList) {
  console.log("유저 로드 액션을 실행할거야!");
  return { type: LOAD, userList };
}

// Middleware
export const loginFB = (body) => {
  return async function (dispatch) {
    try {
      let data = {
        username: body.email,
        password: body.password,
      };

      const res = await axios.post("http://54.180.94.133/api/login", data);
      // console.log(res);
      // console.log(res.headers.authorization);

      dispatch(loadUser(res.headers.authorization));
      const token = res.headers.authorization;
      setCookie(token);
      window.alert("로그인에 성공했습니다!");
      window.location.reload();
    } catch (err) {
      window.alert("로그인에 실패했습니다!");
    }
  };
};

// Reducer
// configStore에 정보 넣어놔야 함
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user_reducer/LOAD": {
      console.log("유저 정보를 로드할거야 !");
      return {
        token: action.userList,
        isAuth: true,
      };
    }

    default:
      return state;
  }
}
