import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 다릅니다.");
    }

    let body = {
      email: Email,
      password: Password,
      passWordCheck: ConfirmPassword,
      nickname: Nickname,
    };

    SignUpFB(body);
  };

  const SignUpFB = async (body) => {
    try {
      let data = {
        username: body.email,
        password: body.password,
        passwordCheck: body.passWordCheck,
        nickname: body.nickname,
      };
      // console.log(data);
      const res = await axios.post(`http://54.180.94.133/api/signup`, data);
      window.alert("회원가입에 성공하셨습니다!");
      history.push("/");
    } catch (err) {
      window.alert("회원정보를 다시 확인해주세요!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="value" value={Email} onChange={onEmailHandler} />

        <label>Nickname</label>
        <input type="text" value={Nickname} onChange={onNicknameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button>회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
