import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";



import post from "./modules/post";
import reducer from "./modules/post";
import User from "./modules/user";
import image from "./modules/image";

export const history = createBrowserHistory();



const rootReducer = combineReducers({post,User,image});
//중괄호속 reducer는 테스트용
const middlewares = [thunk.withExtraArgument({history:history})];



const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
      );

      let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();