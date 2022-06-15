// Add.js 게시글 작성 페이지
import React from 'react'
import styled from 'styled-components';
import axios from "axios"
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
//firbase import
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"
import {auth, db, storage} from "../firebase"
import { collection, addDoc } from "firebase/firestore"

//components
import Header from '../components/Header';

function Add() {
    const file_ref = React.useState(null)
    const file_link_ref = React.useRef(null)
    const text_ref = React.useRef(null)
    const product_ref = React.useRef(null)
    const [imageSrc, setImageSrc] = React.useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    const [post, setPost] = React.useState({
        product: "",
        content: ""
      });



    //이미지 미리보기
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImageSrc(reader.result);
            resolve();
          };
        });
    }

      // computed property names 문법 (키값 동적 할당)
      const handleForm = (e) => {
        setPost({
          ...post,
          [e.target.name]: e.target.value,
        });
      };
    


    // firebase코드 시작
    const uploadFB = async() => {
        if (text_ref==="") {
            window.alert("텍스트를 입력하세요!")
        }

        else  { console.log(file_ref.current.files)
        const uploaded_file = await uploadBytes(ref(storage,`images/${file_ref.current.files[0].name}`),
        file_ref.current.files[0]
        )
        console.log(uploaded_file)
        //Ref를 가지고온것은 중요, 이 Ref로 다운로드 URL을 가지고올것

        const file_url = await getDownloadURL(uploaded_file.ref)
        console.log(file_url)
        file_link_ref.current = {url:file_url}
        
        axios.post("http://dlckdals04.shop/post",
        {
            "image" : file_link_ref.current?.url,
            "product": product_ref.current.value,
            "content": text_ref.current.value
        },{headers: { 'Authorization': `Bearer ${token}` },}
        ) 
            .then(function (response) {           
                    alert("작성완료!")
                    navigate('/');
                    console.log(response)
                
            })
            .catch(function (error) {
                console.log(error.response.data.errorMessage);
            })
        
        
        }
       
      }



    return (
        <>
            <Header />
            <WriteBox>
                <PostBlock>
                    <h1>게시글 작성</h1>
                    <h4>이미지 미리보기</h4>                  
                    <input type="file" ref ={file_ref} onChange={(e) => {
                        encodeFileToBase64(e.target.files[0]);
                    }} />
                    <div className="picture">
                        {imageSrc && <img src={imageSrc} alt="preview-img" />}
                    </div>
                    <div className='item_name'>
                        품목명: <input name="product" ref={product_ref} value={post.product} onChange={handleForm} type="text"></input>    
                    </div>
                                
                    <textarea name="content" ref={text_ref} onChange={handleForm} value={post.content} placeholder='내용을 입력해주세요'/>
                    <button onClick={uploadFB}>완료하기</button>
                </PostBlock>
            </WriteBox>
        </>
    )
}

const WriteBox = styled.div`
width: 450px;
height: 800px;
background: white;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 50px;
margin-bottom: 32px;
display: flex;
flex-direction: column;
`;

const PostBlock = styled.div`
display: flex;
flex-direction: column;
align-items: center;
textarea {
    &:hover { 
        outline: 0.5px solid black;
    }
    width:80px;
    outline: none;
}
img {
    width: 100%;
    height: 100%;
    margin-top: 20px;
}
.picture {
   width: 300px;
   height: 200px;
}
textarea {
    width: 80%;
    height: 12.25em;
    border: 1px solid lightgray;
    resize: none;
    margin-top: 80px;
  }
  button {
      margin-top: 10px;   
  }
.item_name  {
    position: relative;
    top: 50px;
    right: 65px
}
`;



export default Add;