import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Post = (props) => {
  const history = useHistory();

  return (
    <PostBtn
      onClick={() => {
        history.push("/posting");
      }}
    >
      +
    </PostBtn>
  );
};

export default Post;

const PostBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  width: 50px;
  padding-bottom: 3px;

  font-size: 60px;
  background-color: #8977ad;
  color: white;
  border-radius: 30px;

  position: fixed;
  bottom: 20px;
  right: 20px;

  cursor: pointer;
  border: #8977ad;

  transition: 1s;

  &:hover {
    transform: rotate(180deg);
  }
`;
