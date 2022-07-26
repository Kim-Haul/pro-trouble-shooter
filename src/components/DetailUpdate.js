import React, { useCallback, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const Posting = (props) => {
  const params = useParams();
  const history = useHistory();

  const title = React.useRef(null);
  const contents = React.useRef(null);

  // const [loading, setLoading] = useState(false);
  const [list, setList] = useState({});
  const axiosLoad = async () => {
    const res = await axios.get(`http://localhost:5001/posts/${params.idx}`);
    // console.log(res.data);
    setList(res.data);
  };

  // const axiosLoad = () => {
  //   axios.get(`http://localhost:5001/posts/${params.idx}`).then((res) => {
  //     console.log(res);
  //     console.log(res.data.title);
  //     setList(res.data);
  //   });
  // };

  React.useEffect(() => {
    axiosLoad();
  }, []);

  const [Selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const axiosUpdate = async (title, contents) => {
    let data = {
      title: title,
      category: Selected,
      contents: contents,
    };
    await axios.put(`http://localhost:5001/posts/${params.idx}`, data);
  };

  // 동기, 비동기 오류 고생
  // const [updateTitle, setTitle] = useState(list.title);
  // const [updateContents, setContents] = useState(list.contents);

  // const handleTitle = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleContents = (e) => {
  //   setContents(e.target.value);
  // };

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
            defaultValue={list.title}
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
            defaultValue={list.contents}
          />
        </div>

        <button
          type="button"
          className="btn btn-success"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "30px",
            width: "100px",
          }}
          onClick={() => {
            if (
              title.current.value != "" &&
              contents.current.value != "" &&
              Selected != ""
            ) {
              axiosUpdate(
                title.current.value,
                contents.current.value,
                Selected
              );
              history.push(`/detail/${params.idx}`);
              window.location.reload();
            } else {
              window.alert("입력하지 않은 항목이 있습니다.");
            }
          }}
        >
          수정완료
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
