import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { actionCreators as imageActions } from "./image";


// Actions
const LOAD = 'magazine/LOAD'
const CREATE = 'magazine/CREATE'


//Actions Creators
export const LoadPost = (post_list) => {
  return {type: LOAD, post_list}
}
const token = sessionStorage.getItem("token");
const initialState = {
    posts : [
    { 
        nickname: "닉네임1",
        image:
        "http://ppanggeut.net/upfiles/org/202202/org_621cd5c966be6l6y2ff.gif",
        product:"카리나짱",
        postId : "1",
    },
    { 
        nickname:"닉네임2",
        image:"https://thumbs.gfycat.com/EquatorialHeartyIslandcanary-size_restricted.gif",
        product:"신민아짱",
        postId : "2",
    },
        { 
        nickname:"닉네임3",
        image:"https://image.xportsnews.com/contents/images/upload/article/2016/1118/1479437481013521.jpg",
        product:"한가인",
        postId : "3",
    },
        { 
        nickname:"닉네임4",
        image:"https://firebasestorage.googleapis.com/v0/b/magazine-40b77.appspot.com/o/images%2F%EC%95%84%EC%9D%B4%EC%9C%A0.jpg?alt=media&token=70b1c5be-268d-41e9-bc71-91de9b1ec11c",
        product:"아이유짱",
        postId : "4",
    },
    { 
        nickname:"닉네임5",
        image:"https://t1.daumcdn.net/cfile/tistory/275F77485433D4D618",
        product:"한고은짱",
        postId : "5",
    },
    { 
        nickname:"닉네임6",
        image:"https://c.tenor.com/4LsMrRAVvNcAAAAC/as-if-its-your-last-black-pink.gif",
        product:"제니짱",
        postId : "6",
    },
             
        ],
    }





export const getPostDB = () => {
  return async function (dispatch, getState) {
    await axios
      .get("http://dlckdals04.shop/")
      .then((response) => {
        console.log(response)
        dispatch(LoadPost(response.data))
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
};




// Reducer //중괄호속 reducer는 테스트용
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
      case LOAD:{
        console.log(action)
          let test = {list:action.post_list}
          return test
          console.log(test)
      }

      case CREATE : {
          console.log(action.post_list)
          console.log(state.posts)
          const new_dictionary_list =
               [...state.posts, 
              ...action.post_list]
          console.log(new_dictionary_list)
          return new_dictionary_list
      }
  default: return state;
  }
  }