// Header2.js 로그인 됐을 때 (+로그아웃 버튼)
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

function Header2() {
  const navigate = useNavigate();

  return (
    <SignOut>
          <button className='post' onClick={()=>{navigate('/post')}}>게시글 작성</button>
          <button className='signout' onClick={()=>{navigate('/')}}>로그아웃</button>
    </SignOut>
  )
}

const SignOut = styled.div`
display: flex;
justify-content: flex-end;
margin: 0;
border-bottom: 1px solid lightgray;
background-color: white;
padding: 30px;

.post {
  margin-right: 10px;
}

.signout {
    margin-right: 10px;
}

`;

export default Header2;
