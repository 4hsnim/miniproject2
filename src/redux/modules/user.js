import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "./cookie";
import axios from "axios"
// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
// initialState
const initialState = {
  user: null,
  is_login: false,
};
// middleware
const signupDB = (id, pwd, pwdCheck, url, ) => {
  return async function (dispatch, getState, { history }) {
// axios 연결하기
    console.log(id,pwd,)
    await axios({
      method: 'post',
      url: 'http://15.164.163.116/api/signup',
      data: {
        userId: id,
        password: pwd,
        userImageUrl: url,
        confirmPassword: pwdCheck,
      }
    })
    .then(function(response) {
      console.log(response)
      dispatch(
        setUser({
          userId: response.data.id,
          password: pwd,
          userImageUrl: url,
        })
      );
      window.alert(`${id}님 환영합니다! :)`)
      history.push('/login')
    })
    .catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("회원가입에 실패했습니다! 다시 시도해주세요")
      console.log(errorCode,errorMessage)})
  };
};
const loginDB = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
  //axios 연결하기
   await axios({
      method: 'post',
      url: 'http://dlckdals04.shop/login',
      data: {
        ID: id,
        password : pwd,
      }
    })
    .then(async function(response) {
        console.log(response.data.token)
        console.log(response)
      localStorage.setItem("token", response.data.token);
      dispatch(
        setUser({
          userId: id,
        })

      );dispatch(loginCheckDB())
      window.alert(`${id}님 환영합니다! :)`)
      history.push("/");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.response.data.errorMessage)
      window.alert("로그인에 실패했습니다! 다시 시도해주세요")
      console.log(errorCode, errorMessage);
    });
  };
};
const loginCheckDB = () => {
  const token = localStorage.getItem("token");
  return async function (dispatch, getState, {history}){
    await axios({
      method: 'get',
      url: 'http://15.164.163.116/api/checkLogin',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(function(user){
      if(user){
        dispatch(
          getUser({
            userId: user.data.userId,
            userImageUrl: user.data.userImageUrl,
          })
        );
        
      }else{
        dispatch(logOut());
    }
    })
  }
}
const logoutDB = () => {
  return async function (dispatch, getState, {history}) {
      localStorage.clear();
      dispatch(logOut());
      history.replace('/');
    }
}
// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);
// action creator export
const actionCreators = {
  setUser,
  logOut,
  getUser,
  signupDB,
  loginDB,
  loginCheckDB,
  logoutDB,
};
export { actionCreators };