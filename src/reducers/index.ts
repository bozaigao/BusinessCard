import {combineReducers} from 'redux'
import login from "../actions/login";
import taskCenter from "../actions/task_center";
import Dict from "../actions/dict";
import File from "../actions/file";
import Goods from "../actions/goods";

export default combineReducers({
  login,
  taskCenter,
  Dict,
  File,
  Goods
})
