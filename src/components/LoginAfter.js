import React from "react";
import styled from "styled-components";
import { setCookie, getCookie, deleteCookie } from "../shared/Cookie";
import { useHistory } from "react-router-dom";

const LoginBefore = (props) => {
  const history = useHistory();
  return (
    <NavButton>
      <ButtonU
        onClick={() => {
          deleteCookie("Authorization");
        }}
      >
        Log-out
      </ButtonU>
    </NavButton>
  );
};

export default LoginBefore;

const NavButton = styled.div`
  display: flex;
`;

const ButtonI = styled.button`
  width: 200px;
  height: 50px;
  font-size: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 250px;
  top: 30px;
`;

const ButtonU = styled.button`
  width: 200px;
  height: 50px;
  font-size: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 20px;
  top: 30px;
`;
