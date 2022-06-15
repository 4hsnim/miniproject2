// Main2.js 메인 페이지(로그인 상태)
import React from 'react'
import styled from 'styled-components'

//components
//Header2: 게시글 작성, 로그아웃 버튼
import Header2 from '../components/Header2';


function Main2() {
  return (
    <>
      <Header2/>
       <Container>
       <div className='post'><HomeCard/></div>
        <div className='post'><HomeCard/></div>
        <div className='post'><HomeCard/></div>
       </Container>

       <Container>
       <div className='post'><HomeCard/></div>
        <div className='post'><HomeCard/></div>
        <div className='post'><HomeCard/></div>
       </Container>

       <Container>
       <div className='post'><HomeCard/></div>
        <div className='post'><HomeCard/></div>
        <div className='post'><HomeCard/></div>
       </Container>
    
    
    </>
  )
}

const Container = styled.div`
display: flex;
flex-direction: row;
`;

const HomeCard = styled.div`
&:hover {
  transform: scale(1.1); 
  transition: 2s;
}

width: 300px;
height: 300px;

background: #d3d3d3;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);

margin-top: 50px;
margin-bottom: 32px;
margin-left: 100px;
display: flex;
flex-direction: column;
cursor: pointer;
`;


export default Main2;
