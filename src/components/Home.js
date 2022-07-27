import React, { useState } from "react";
import styled from "styled-components";

import { loadPostFB } from "../redux/modules/loadPostStore";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [Selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const list = useSelector((state) => state.loadPostStore.list);

  // const [list, setList] = useState("");
  // const axiosLoad = async () => {
  //   const res = await axios.get("http://localhost:5001/posts");
  //   console.log(res.data.result);
  //   let post_list = [];
  //   res.data.result.forEach((doc) => {
  //     console.log("Home.js에서 바로 axios 요청", { ...doc });
  //     post_list.push({ ...doc });
  //   });
  //   setList(post_list);
  // };

  React.useEffect(() => {
    // axiosLoad();
    dispatch(loadPostFB());
  }, []);

  const listFE = list.filter((v, i) => v.category == Selected);
  const listBE = list.filter((v, i) => v.category == Selected);

  return (
    <Body>
      <Bg />
      <Select className="form-select" onChange={handleSelect}>
        <option defaultValue>Overview</option>
        <option value="FE">FE</option>
        <option value="BE">BE</option>
      </Select>

      <Board>
        {Selected == ""
          ? list.map((v, i) => {
              return (
                <ListBox key={i}>
                  <ListContainer>
                    <LisTitle
                      onClick={() => {
                        history.push(`detail/${v.postId}`);
                      }}
                    >
                      {v.title}
                    </LisTitle>
                    <LisTNic>{v.nickname}</LisTNic>
                  </ListContainer>
                  <div>
                    {v.category == "FE" ? (
                      <ButtonA
                        type="button"
                        className="btn btn-danger"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    ) : (
                      <ButtonA
                        type="button"
                        className="btn btn-warning"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    )}

                    <ButtonB
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "0 5px 5px" }}
                    >
                      Comment{" "}
                      <span className="badge bg-secondary">
                        {v.commentCount}
                      </span>
                    </ButtonB>
                    {v.solved == true ? (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        해결
                      </ButtonC>
                    ) : (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        미해결
                      </ButtonC>
                    )}
                  </div>
                </ListBox>
              );
            })
          : // .reverse()
            null}

        {Selected == "Overview"
          ? list.map((v, i) => {
              return (
                <ListBox key={i}>
                  <ListContainer>
                    <LisTitle
                      onClick={() => {
                        history.push(`detail/${v.postId}`);
                      }}
                    >
                      {v.title}
                    </LisTitle>
                    <LisTNic>{v.nickname}</LisTNic>
                  </ListContainer>
                  <div>
                    {v.category == "FE" ? (
                      <ButtonA
                        type="button"
                        className="btn btn-danger"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    ) : (
                      <ButtonA
                        type="button"
                        className="btn btn-warning"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    )}
                    <ButtonB
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "0 5px 5px" }}
                    >
                      Comment{" "}
                      <span className="badge bg-secondary">
                        {v.commentCount}
                      </span>
                    </ButtonB>
                    {v.solved == true ? (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        해결
                      </ButtonC>
                    ) : (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        미해결
                      </ButtonC>
                    )}
                  </div>
                </ListBox>
              );
            })
          : // .reverse()
            null}

        {Selected == "FE"
          ? listFE.map((v, i) => {
              return (
                <ListBox key={i}>
                  <ListContainer>
                    <LisTitle
                      onClick={() => {
                        history.push(`detail/${v.postId}`);
                      }}
                    >
                      {v.title}
                    </LisTitle>
                    <LisTNic>{v.nickname}</LisTNic>
                  </ListContainer>
                  <div>
                    {v.category == "FE" ? (
                      <ButtonA
                        type="button"
                        className="btn btn-danger"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    ) : (
                      <ButtonA
                        type="button"
                        className="btn btn-warning"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    )}
                    <ButtonB
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "0 5px 5px" }}
                    >
                      Comment{" "}
                      <span className="badge bg-secondary">
                        {v.commentCount}
                      </span>
                    </ButtonB>
                    {v.solved == true ? (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        해결
                      </ButtonC>
                    ) : (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        미해결
                      </ButtonC>
                    )}
                  </div>
                </ListBox>
              );
            })
          : // .reverse()
            null}

        {Selected == "BE"
          ? listBE.map((v, i) => {
              return (
                <ListBox key={i}>
                  <ListContainer>
                    <LisTitle
                      onClick={() => {
                        history.push(`detail/${v.postId}`);
                      }}
                    >
                      {v.title}
                    </LisTitle>
                    <LisTNic>{v.nickname}</LisTNic>
                  </ListContainer>
                  <div>
                    {v.category == "FE" ? (
                      <ButtonA
                        type="button"
                        className="btn btn-danger"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    ) : (
                      <ButtonA
                        type="button"
                        className="btn btn-warning"
                        style={{ margin: "0 5px 5px" }}
                      >
                        {v.category}
                      </ButtonA>
                    )}
                    <ButtonB
                      type="button"
                      className="btn btn-primary"
                      style={{ margin: "0 5px 5px" }}
                    >
                      Comment{" "}
                      <span className="badge bg-secondary">
                        {v.commentCount}
                      </span>
                    </ButtonB>
                    {v.solved == true ? (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        해결
                      </ButtonC>
                    ) : (
                      <ButtonC
                        type="button"
                        className="btn btn-success"
                        style={{ margin: "0 5px 5px" }}
                      >
                        미해결
                      </ButtonC>
                    )}
                  </div>
                </ListBox>
              );
            })
          : // .reverse()
            null}
      </Board>
    </Body>
  );
};

export default Home;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 100px;
`;

const Bg = styled.div`
  margin-top: 100px;
  width: 100%;
  min-width: 1400px;
  height: 250px;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url("https://gobooki.net/wp-content/uploads/2021/07/what-is-coding-1.jpg");
  background-position: center;
  background-size: cover;
`;

const Board = styled.div`
  margin: 100px 0;
  width: 60%;
`;

const Select = styled.select`
  padding: 5px;
  width: 15%;
  min-width: 200px;

  position: absolute;
  top: 390px;
  left: 20px;
`;

const ListBox = styled.div`
  margin: 10px 10px 15px;
  padding: 10px;
  border: 1px solid gray;
  box-shadow: 3px 3px gray;
  min-width: 800px;
`;

const ButtonA = styled.button`
  width: 40px;
`;

const ButtonB = styled.button`
  width: 120px;
`;

const ButtonC = styled.button`
  width: 80px;
`;

const ListContainer = styled.div`
  margin: 10px;
  display: flex;
  position: relative;
`;

const LisTitle = styled.div`
  font-size: 18px;
  cursor: pointer;
  font-family: "MICEMyungjo";
`;

const LisTNic = styled.div`
  position: absolute;
  top: 0px;
  right: 5px;
  font-family: "Hahmlet-Bold";
`;
