// Main.js 메인 페이지(로그인X)
import React from 'react';

import styled from 'styled-components';


import axios from "axios"

import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch, } from "react-redux";



//components
//Header: 로그인, 로그아웃 버튼
import Header from '../components/Header';


function Main() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const data = useSelector((state) => state.post.list)
  // console.log("state : " ,useSelector((state) => state))
  // console.log(data)
  
  const [state, setState] = React.useState("")


  React.useEffect(() => {
    axios
      .get("http://dlckdals04.shop/") // back-end server http://13.125.151.93/api/poststudy
      .then((response) => {
        setState(response.data.posts);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

console.log(state)


  // setimage(response.data.posts.image)
  //         setproduct(response.data.posts.product)
  //         setnickname(response.data.posts.content)


//   React.useEffect(() => {

//     dispatch(getPostDB());

// }, []);   


  return (
    <>     
      <Header />

      <Container>
        {state&&state.map((posts,index) => 
          
          <HomeCard onClick={() => { navigate('/detail/'+posts.postId) }}>
            <div>
              <img src= {posts.image}/>
            </div>
            

            <div className='content'>
              <strong>{posts.product}</strong>
              <h4>{posts.nickname}</h4>
            </div>

            <div className='icons'>
            </div>    
        </HomeCard>
       
        )}
        
      </Container>

    </>
  )
}

const Container = styled.div`
* {
  box-sizing: border-box;
}
display: grid;
grid-template-columns: repeat(auto-fit,400px);
gap: 3em;
justify-content: center;
align-items: center;
width: 100%;
position: relative;
background-color: #fafafa;
`;

const HomeCard = styled.div`
// &:hover {
//     transform: scale(1.1); 
//     transition: 0.2s;  
// }
display: flex;
flex-direction: column;
width: 370px;
height: 390px;
overflow: hidden;
background: white;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
margin: 0 auto;
margin-top: 70px;
cursor: pointer;
border: 1px solid white;
img {
  width: 100%;
  height: 300px;
  border-bottom: 2px solid rgba(223, 223, 223, 0.60);
}
.content {
  margin-top: 10px;
  margin-left: 10px;
}
.content_item {
  font-weight: normal;
  height: 50%;
}
.text{
  margin-left: 10px;
}
.line {
  border-bottom: 1px solid lightgray;
}
.icons {
  border-bottom: 1px solid rgba(223, 223, 223, 0.52);
}
`;


export default Main;