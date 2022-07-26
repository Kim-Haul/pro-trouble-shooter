import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Posting = (props) => {
  // 게시글 작성
  const axiosAdd = async (title, contents, Selected) => {
    try {
      let data = {
        title: title,
        category: Selected,
        contents: contents,
      };

      await axios.post("http://localhost:5001/posts", data);
    } catch (err) {
      console.log("포스팅 오류!");
    }
  };

  const [Selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const history = useHistory();
  const title = React.useRef(null);
  const contents = React.useRef(null);
  return (
    <PostingContainer>
      <PostingBox>
        <div>
          <Title
            className="form-control"
            type="text"
            placeholder="Title"
            aria-label="default input example"
            ref={title}
          />
        </div>

        <div>
          <Select className="form-select" onChange={handleSelect}>
            <option defaultValue>Category</option>
            <option value="FE">FE</option>
            <option value="BE">BE</option>
          </Select>
        </div>

        <div className="mb-3">
          <Textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Solving problem"
            rows="12"
            ref={contents}
          ></Textarea>
        </div>

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
            if (
              title.current.value != "" &&
              contents.current.value != "" &&
              Selected != ""
            ) {
              axiosAdd(title.current.value, contents.current.value, Selected);
              history.push("/");
              window.location.reload();
            } else {
              window.alert("입력하지 않은 항목이 있습니다.");
            }
          }}
        >
          글쓰기
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
            history.push("/");
          }}
        >
          취소
        </button>
      </PostingBox>
    </PostingContainer>
  );
};

export default Posting;

const PostingContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostingBox = styled.div`
  margin-top: 200px;
  width: 50%;
  min-width: 500px;
  height: 500px;
  border: 1px solid gray;
  background-color: #b3b3b3;

  position: relative;
`;

const Title = styled.input`
  margin: 30px;
  width: 90%;
`;

const Select = styled.select`
  margin-left: 30px;
  padding: 5px;
  width: 15%;
`;

const Textarea = styled.textarea`
  margin: 30px;
  width: 90%;
`;
