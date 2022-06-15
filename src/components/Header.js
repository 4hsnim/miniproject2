//로그인이 안됐을 때
import React from 'react'
import styled from 'styled-components';
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"



function Header() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const dispatch = useDispatch()

  const login = () => {
    //입력 값 정합성 체크 후 login API 요청
        if (id === "" || pwd === "") {
          window.alert("아이디와 비밀번호를 입력해주세요.");
          return;
        }
        
        dispatch(userActions.loginDB(id, pwd));
      };
  return (
    <>
    <LoginBar>
      {/* Main2로 넘어가게 임의로 만들어 둠 */}
      <button className='login' onClick={() => { navigate('/asdf') }}>메인2</button>

      <button className='login' onClick={()=> setModalIsOpen(true)}>로그인</button>
      
      <button className='signup' onClick={() => { navigate('/signup') }}>회원가입</button>
    </LoginBar>
    <Modal isOpen={modalIsOpen} style={modalstyle}>
      <SignBox>
          <SignInBlock>
          <h1>로그인</h1>
          <p>아이디</p>
          <input onChange={(e) => {
              setId(e.target.value);
            }} type="text" placeholder="이메일 형식을 입력하세요"/>
          <p>비밀번호</p>
          <input type="password"  onChange={(e) => {
              setPwd(e.target.value);
            }} placeholder="비밀번호를 입력하세요" />
          {/* 1. 시작점 */}
          <button onClick={login}>로그인</button>
          <button onClick={()=> setModalIsOpen(false)}>닫기</button>
        </SignInBlock>    
      </SignBox>
        
      </Modal>
    </>
  )
}

const LoginBar = styled.div`
display: flex;
justify-content: flex-end;
margin: 0;
border-bottom: 1px solid lightgray;
background-color: white;
padding: 30px;

.login {
    margin-right: 10px;
}

.signup {
   margin-right: 10px;
}
`;

const SignBox = styled.div`
width: 450px;
height: 568px;

background: white;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);

margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 50px;
margin-bottom: 32px;
display: flex;
flex-direction: column;
`;

const SignInBlock = styled.div`
display: flex;
flex-direction: column;
align-items: center;

h1 {
    margin-top: 40px;
    margin-bottom: 40px;
}

p {
    margin: 7px;
    padding-right: 200px;
    
}

input {
    &:hover { 
        outline: 1.5px solid black;
    }
    width: 250px;
    height: 35px;
    border: 2px solid lightgray;
    outline: none;
}

button {
    width: 100px;
    margin-top: 30px;
   
}
`;
// Modal 스타일 (기본default값임)
const modalstyle = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 10,
	},
	content: {
		background: "aliceblue",
		overflow: "auto",
		top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
		WebkitOverflowScrolling: "touch",
		borderRadius: "14px",
		outline: "none",
		zIndex: 10,
	},
};


export default Header;
