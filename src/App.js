import React, { useState } from "react";
import "./style.css";
import styled from "styled-components";

import Home from "./components/Home";
import LoginAfter from "./components/LoginAfter";
import LoginBefore from "./components/LoginBefore";
import PostBtn from "./components/PostBtn";
import Posting from "./components/Posting";
import Detail from "./components/Detail";
import DetailUpdate from "./components/DetailUpdate";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setCookie, getCookie, deleteCookie } from "./shard/Cookie";
// import { useSelector } from "react-redux/es/exports";

function App() {
  const history = useHistory();
  // console.log(getCookie().substr(6));

  // const is_logined = useSelector((state) => state.user_reducer.isAuth);
  const [login, setLogin] = useState(false);

  React.useEffect(() => {
    const is_logined = getCookie();
    if (is_logined) {
      setLogin(true);
    }
  }, []);

  return (
    <div className="App">
      <div>
        <Route path="/">
          {login === false ? (
            <Nav>
              <Title
                onClick={() => {
                  history.push("/");
                  window.location.reload();
                }}
              >
                Pro Truble <span style={{ color: "red" }}>S</span>hooter
              </Title>
              <LoginBefore />
            </Nav>
          ) : (
            <Nav>
              <Title
                onClick={() => {
                  history.push("/");
                  window.location.reload();
                }}
              >
                Pro Truble <span style={{ color: "red" }}>S</span>hooter
              </Title>
              <LoginAfter />
            </Nav>
          )}
        </Route>

        <Route path="/" exact>
          <Home />
          {login === true ? <PostBtn /> : null}
        </Route>

        <Route path="/posting">
          <Posting />
        </Route>

        <Route path="/detail/:idx">
          <Detail />
        </Route>
        {/* <Route path="/detail/:idx">
          <Dee />
        </Route> */}

        <Route path="/detailupdate/:idx">
          <DetailUpdate />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/signup">
          <RegisterPage />
        </Route>
      </div>
    </div>
  );
}

export default App;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 90%;
  min-width: 950px;
`;

const Title = styled.div`
  position: absolute;
  left: 40px;
  top: 20px;

  font-size: 36px;
  cursor: pointer;
`;
