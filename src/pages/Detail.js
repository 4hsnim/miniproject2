import React from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios"
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from "react-redux";




//components
import Header2 from '../components/Header2';
import DetailBox from '../components/DetailBox';

function Detail() {
    let {postId} = useParams()
    const [state, setState] = React.useState("")

    const dispatch = useDispatch();
    const token = localStorage.getItem("token")

    const [product, setProduct] = React.useState(['애플','삼성','LG']);
    const [content, setContent] = React.useState(['Apple','Samsung','LG']);
    // console.log(state)


    React.useEffect( () => {
         axios
          .get("http://dlckdals04.shop/"+postId) 
          .then((response) => {
            setState(response.data);
            console.log(response.data);
          })
          .catch((response) => {
            console.log(response);
          });
      }, []);
    
    console.log(state)


    return (
        <>
            <Header2 />
            <DetailPage>
                <DetailBlock>
                 <DetailBox state={state}
                 />  
                </DetailBlock>
            </DetailPage>
        </>
    )
    
}

const DetailPage = styled.div`
width: 850px;
height: 600px;
background: white;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
margin-top: 50px;
margin-bottom: 32px;
display: flex;
flex-direction: column;
`;

const DetailBlock = styled.div`
margin: auto;
  display: flex;
  align-items: center;
textarea {
&:hover { 
outline: 0.5px solid black;
}
width:80px;
}
img {
width: 300px;
}
.picture {
width: 300px;
height: 200px;
}
textarea {
width: 40%;
height: 50%;
border: 1px solid lightgray;
resize: none;
margin: 0 auto;
outline: none;
}
button {
margin-top: 10px;   
}
`;

export default Detail;
