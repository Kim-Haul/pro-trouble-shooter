import axios from "axios";

// Actions
const LOAD = "loadPostStore/LOAD";

// 초기값 설정
const initialState = {
  list: [],
};

// Action Creators
export function loadPost(postIist) {
  console.log("단어 로드 액션을 실행할거야!");
  return { type: LOAD, postIist };
}

// Middleware
export const loadPostFB = () => {
  return async function (dispatch) {
    let post_list = [];
    try {
      const res = await axios.get("http://localhost:5001/posts");
      res.data.forEach((doc) => {
        post_list.push({ ...doc });
      });

      // console.log(post_list);
      dispatch(loadPost(post_list));
    } catch (err) {
      console.log("게시글 목록을 불러오는데 에러!");
    }
    // console.log("리덕스에서 확인", res.data);
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "loadPostStore/LOAD": {
      console.log("값을 로드할거야 !");
      return { list: action.postIist };
    }

    default:
      return state;
  }
}
