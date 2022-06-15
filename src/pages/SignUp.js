//SignUp.js 회원가입 페이지
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";


function SignUp() {
    const navigate = useNavigate();
    const id_ref = React.useRef(null)
    const name_ref = React.useRef(null)
    const pw_ref = React.useRef(null)
    const pwcheck_ref = React.useRef(null)

    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [pw, setPw] = React.useState("");
    const [checkPw, setCheckPw] = React.useState("");


    // //회원가입 유효성 검사
    const checkID = () => {
        const id_value = Array.from(id_ref.current.value)
        if(id_value == "") {
            alert('아이디를 입력해주세요!')
            document.getElementById('id').focus()
        } else if (id_value.length < 4) {
            alert('4자리 이상 12자리 이하의 아이디를 적어주세요.')
            document.getElementById('id').focus()
         } else if (id_value.length > 12) {
          alert('4자리 이상 12자리 이하의 아이디를 적어주세요.')
         } else {
            checkName()
        }
    };

    const checkName = () => {
        const name_value = Array.from(name_ref.current.value)
        if(name_value == "") {
            alert('닉네임을 입력해주세요!')
            document.getElementById('name').focus()
        } else if (name_value.length < 2) {
            alert('2자리 이상 12자리 이하의 아이디를 적어주세요.')
            document.getElementById('name').focus()
        } else if (name_value.length > 12) {
            alert('2자리 이상 12자리 이하의 아이디를 적어주세요.')
            document.getElementById('name').focus()
        } else {
            checkPW()
        }
    };


    const checkPW = () => {
        const pw_value = Array.from(pw_ref.current.value)
        if (pw_value== "") {
            alert('비밀번호를 입력해주세요.')
        } else if (pw_value.length < 4) {
          alert('4자리 이상 12자리 이하의 비밀번호를 적어주세요.')
        } else if (pw_value.length > 12){
            alert('4자리 이상 12자리 이하의 비밀번호를 적어주세요.')
            document.getElementById('pw').focus()
        } else if(pwcheck_ref.current.value == ""){
            alert('비밀번호를 한 번 더 체크해주세요.')
            document.getElementById('checkPw').focus()
        } else if(pw_ref.current.value !== pwcheck_ref.current.value) {
            alert('비밀번호가 일치하지 않습니다.')
            document.getElementById('checkPw').focus()
        } else {
            callSomethingAxios()
        }   
    };


    const callSomethingAxios =  () => {                    
        axios.post("http://dlckdals04.shop/signup",{
            "ID" : id_ref.current.value,
            "nickname" : name_ref.current.value,
            "password": pw_ref.current.value,
            "passwordCheck": pwcheck_ref.current.value
        }) .then(function (response) {           
                alert("회원가입을 축하합니다!")
                navigate('/');
                console.log(response)
            
        })
        .catch(function (error) {
            console.log(error.response.data.errorMessage);
        })
    }
        // }
        
    

  return (
    <>
    <Header />
    <SignBox>
    <SignUpBlock>
        <h1>회원가입</h1>
       
        <label>아이디</label>
        <input ref ={id_ref}type="text" id="id"
            onChange={(e) => { 
                setId(e.target.value);
            }}
          
        placeholder="이메일 형식을 입력하세요" />
        
        <label>닉네임</label>
        <input ref ={name_ref} type="text" id="name"
            onChange={(e) => { 
                setName(e.target.value);
              }}
        placeholder="닉네임을 입력하세요" />
        
        <label>비밀번호</label>
        <input ref ={pw_ref} type="password" id="pw"
            onChange={(e) => { 
                setPw(e.target.value);
              }}
        placeholder="비밀번호를 입력하세요" />
        
        <label>비밀번호 확인</label>
        <input ref ={pwcheck_ref} type="password" id="pw_check"
            onChange={(e) => { 
                setCheckPw(e.target.value);
              }}
        placeholder="비밀번호를 다시 입력하세요" />
        
        <button onClick={callSomethingAxios} >회원가입</button>
    </SignUpBlock>
    </SignBox>
   
</>
  )
}

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

const SignUpBlock = styled.div`
@import url("https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet"); 
*{
    font-family: 'Gowun Dodum', sans-serif;
}  
display: flex;
flex-direction: column;
align-items: center;

h1 {
    margin-top: 40px;
    margin-bottom: 40px;
}

label {
    text-align: left ;
}

input {
    &: hover {
       outline: 1.5px solid #696969; 
    }
    width: 250px;
    height: 35px;
    margin-bottom: 8px;
    border: 2px solid lightgray;
    outline: none;
}

button {
    width: 100px;
    margin-top: 30px; 
}

`;


export default SignUp
