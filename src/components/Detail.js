import React, { useState } from "react";
import axios from "axios";
import styled, { isStyledComponent } from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { setCookie, getCookie, deleteCookie } from "../shared/Cookie";
import jwtDecode from "jwt-decode";

const Posting = (props) => {
  const history = useHistory();
  const params = useParams();
  const accessToken = getCookie();

  let decoded = "";
  if (accessToken) {
    decoded = jwtDecode(accessToken);
  }

  // 게시글 목록, 댓글 불러오기
  const [list, setList] = useState({});
  const [is_load, setLoad] = useState(false);
  const axiosLoad = async () => {
    try {
      const res = await axios.get(
        `http://54.180.94.133/api/posts/${params.idx}`
      );
      // const res = await axios.get(`http://localhost:5001/posts/${params.idx}`);

      setList(res.data);
      setLoad(true);
    } catch (err) {
      console.log("게시글 세부 내용을 불러오는데 에러");
    }
  };

  //  게시글 삭제
  const axiosDelete = async () => {
    try {
      await axios.delete(`http://54.180.94.133/api/posts/${params.idx}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // await axios.delete(`http://localhost:5001/posts/${params.idx}`);
      history.push("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      console.log("게시글 삭제하는데 에러");
    }
  };

  // 게시글 목록 불러오기
  React.useEffect(() => {
    axiosLoad();
  }, []);

  // 댓글작성
  const contents = React.useRef(null);
  const axiosPostComment = async (content) => {
    try {
      let data = {
        content: content,
      };
      await axios.post(
        `http://54.180.94.133/api/posts/${params.idx}/comments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // await axios.post(
      //   `http://localhost:5001/posts/${params.idx}/comments`,
      //   data
      // );
    } catch (err) {
      console.log(err);
    }
  };
  <div>
    <button
      type="button"
      className="btn btn-success"
      style={{
        position: "absolute",
        bottom: "10px",
        right: "140px",
        width: "100px",
      }}
      onClick={() => {
        history.push(`/detailupdate/${params.idx}`);
      }}
    >
      수정
    </button>
    <button
      type="button"
      className="btn btn-danger"
      style={{
        position: "absolute",
        bottom: "10px",
        right: "30px",
        width: "100px",
      }}
      onClick={() => {
        axiosDelete();
        history.push("/");
      }}
    >
      삭제
    </button>
  </div>;

  // 댓글삭제
  const axiosCommentDelete = async (i) => {
    try {
      // console.log(i);
      // console.log("댓글 정보확인", list.comments[i]);
      const num = list.comments[i].id;
      console.log(num);
      await axios.delete(`http://54.180.94.133/api/comments/${num}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // await axios.delete(`http://localhost:5001/comments/${num}`);
    } catch (err) {
      console.log("댓글 삭제하는데 에러");
    }
  };

  // 댓글 수정버튼 눌렀을 때 토글
  const [CommentUpdate, setCommentUpdate] = useState("");
  const changeCommentView1 = (i) => {
    setCommentUpdate(i);
  };

  const changeCommentView2 = () => {
    setCommentUpdate();
  };
  //댓글 수정
  const contentsUpdate = React.useRef(null);
  const axiosUpdateComment = async (contentsUpdate, i) => {
    try {
      let data = {
        content: contentsUpdate.current.value,
      };
      const num = list.comments[i].id;
      // console.log(i);
      // console.log(list.comments[i].id);
      await axios.put(`http://54.180.94.133/api/comments/${num}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // await axios.put(`http://localhost:5001/comments/${num}`, data);
    } catch (err) {
      console.log("댓글 수정하는데 에러");
    }
  };

  //문제 해결 여부
  // const [solved, setSolved] = useState(false);
  const onChangeSolved = async () => {
    // setSolved(true);
    let data = {
      solved: true,
    };
    try {
      await axios.put(
        `http://54.180.94.133/api/posts/${params.idx}/comments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // await axios.put(`http://localhost:5001/posts/${params.idx}`, data);
    } catch (err) {
      console.log("문제해결 체크 오류!");
    }
  };

  // console.log(solved);

  const [login, setLogin] = useState(false);
  React.useEffect(() => {
    const is_logined = getCookie();
    if (is_logined) {
      setLogin(true);
    }
  }, []);

  return (
    <PostingContainer>
      <PostingBox>
        {is_load ? (
          <>
            <ContentTitle> {list.title}</ContentTitle>
            <Line />
            <ContentNav>
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                {list.nickname}
              </div>
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                |
              </div>
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                {list.category}
              </div>
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                |
              </div>
              {list.solved == true ? <div>해결</div> : <div>미해결</div>}
            </ContentNav>

            <Line />
            <ContentDesc
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
            >
              {" "}
              {list.content}
            </ContentDesc>

            {decoded.NICK_NAME == list.nickname ? (
              <div>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "140px",
                    width: "100px",
                  }}
                  onClick={() => {
                    history.push(`/detailupdate/${params.idx}`);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "30px",
                    width: "100px",
                  }}
                  onClick={() => {
                    axiosDelete();
                    // history.push("/");
                  }}
                >
                  삭제
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </PostingBox>

      {decoded.NICK_NAME == list.nickname ? (
        <>
          {list.solved == false ? (
            <>
              <button
                type="button"
                className="btn btn-info"
                style={{
                  marginTop: "20px",
                  height: "60px",
                  width: "500px",
                  fontSize: "20px",
                }}
                onClick={() => {
                  onChangeSolved();
                  window.location.reload();
                }}
              >
                If you solved problem, click this btn
              </button>
            </>
          ) : (
            <>
              {is_load ? (
                <>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{
                      marginTop: "20px",
                      height: "60px",
                      width: "500px",
                      fontSize: "20px",
                    }}
                  >
                    Already solved this problem !
                  </button>
                </>
              ) : null}
            </>
          )}
        </>
      ) : (
        <>
          {list.solved == true ? (
            <>
              <>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{
                    marginTop: "20px",
                    height: "60px",
                    width: "500px",
                    fontSize: "20px",
                  }}
                >
                  Already solved this problem !
                </button>
              </>
            </>
          ) : null}
        </>
      )}

      {/* COMMENTBOX */}

      <CommentBox>
        <CommentPost>
          {login ? (
            <>
              <Textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Comment"
                rows="4"
                ref={contents}
              ></Textarea>
              <button
                type="button"
                className="btn btn-warning"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "55px",
                  width: "100px",
                }}
                onClick={() => {
                  if (contents.current.value != "") {
                    axiosPostComment(contents.current.value);
                    contents.current.value = "";
                    // window.alert("댓글이 작성되었습니다 !");
                    window.location.reload();
                  } else {
                    window.alert("입력하지 않은 항목이 있습니다.");
                  }
                }}
              >
                댓글작성
              </button>
            </>
          ) : (
            <h4
              style={{
                textAlign: "center",
                marginTop: "80px",
              }}
            >
              댓글기능은 로그인 후 이용해주세요.
            </h4>
          )}
        </CommentPost>
        <CommentList>
          {list.comments &&
            list.comments.map((v, i) => {
              return (
                <div key={i}>
                  {CommentUpdate === i ? (
                    <div>
                      <Comment>
                        <div
                          style={{
                            marginBottom: "5px",
                            fontWeight: "700",
                          }}
                        >
                          {v.nickname}
                        </div>
                        <div>{v.content}</div>
                        {decoded.NICK_NAME == v.nickname ? (
                          <CommnetFont>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{
                                margin: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                changeCommentView1(i);
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faRectangleXmark}
                              style={{
                                margin: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                axiosCommentDelete(i);
                                // window.alert("댓글이 삭제되었습니다 !");
                                window.location.reload();
                              }}
                            />
                          </CommnetFont>
                        ) : null}
                      </Comment>
                      <div
                        style={{
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        <Textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="Comment"
                          rows="4"
                          ref={contentsUpdate}
                          defaultValue={v.content}
                        ></Textarea>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-info"
                            style={{
                              display: "block",
                              width: "100px",
                              margin: "0 auto",
                            }}
                            onClick={() => {
                              axiosUpdateComment(contentsUpdate, i);
                              // window.alert("댓글이 수정되었습니다 !");
                              window.location.reload();
                            }}
                          >
                            수정하기
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            style={{
                              display: "block",
                              width: "100px",
                              margin: "0 auto",
                            }}
                            onClick={() => {
                              changeCommentView2();
                            }}
                          >
                            취소하기
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Comment>
                      <div
                        style={{
                          marginBottom: "5px",
                          fontWeight: "700",
                        }}
                      >
                        {v.nickname}
                      </div>
                      <div>{v.content}</div>
                      {decoded.NICK_NAME == v.nickname ? (
                        <CommnetFont>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{
                              margin: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              changeCommentView1(i);
                            }}
                          />
                          <FontAwesomeIcon
                            icon={faRectangleXmark}
                            style={{
                              margin: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              axiosCommentDelete(i);
                              // window.alert("댓글이 삭제되었습니다 !");
                              window.location.reload();
                            }}
                          />
                        </CommnetFont>
                      ) : null}
                    </Comment>
                  )}
                </div>
              );
            })}
        </CommentList>
      </CommentBox>
    </PostingContainer>
  );
};

export default Posting;
const PostingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 1000px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostingBox = styled.div`
  margin-top: 200px;
  width: 50%;
  min-width: 500px;
  min-height: 400px;
  border: 1px solid gray;
  background-color: #f2f1f1;

  position: relative;
`;

const Textarea = styled.textarea`
  margin: 30px;
  width: 90%;
`;

const CommentBox = styled.div`
  margin: 20px 70px 70px 70px;
  width: 50%;
  height: 100%;

  min-width: 500px;
  border: 1px solid gray;
  background-color: #f2f1f1;
`;

const CommentList = styled.div`
  margin-top: 10px;
`;

const CommentPost = styled.div`
  position: relative;
  background-color: #b1b0b0;
  padding: 10px;
  height: 200px;
  margin: 10px;
  border: 1px solid black;
`;

const Comment = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  position: relative;
`;

const CommnetFont = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 18px;
`;

const ContentNav = styled.div`
  display: flex;
  margin: 0 20px;
`;

const ContentTitle = styled.div`
  font-size: 26px;
  margin: 0 20px;
`;

const ContentDesc = styled.div`
  margin: 20px;
`;

const Line = styled.hr`
  margin: 5px 10px;
  height: 3px;
  background-color: gray;
`;
