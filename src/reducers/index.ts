import {combineReducers} from 'redux'
import login from "../actions/login";
import taskCenter from "../actions/task_center";
import Dict from "../actions/dict";
import File from "../actions/file";
import Goods from "../actions/goods";
import Customer from "../actions/customer";
import BusinessCard from "../actions/business_card";
import Visitor from "../actions/visitor";
import Radar from "../actions/radar";
import Distribution from "../actions/distribution";
import teQuan from "../actions/tequan";
import Shop from "../actions/shop";

export default combineReducers({
  login,
  taskCenter,
  Dict,
  File,
  Goods,
  Customer,
  BusinessCard,
  Visitor,
  Radar,
  Distribution,
  teQuan,
  Shop
})
