"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const login_1 = require("../actions/login");
const task_center_1 = require("../actions/task_center");
const dict_1 = require("../actions/dict");
const file_1 = require("../actions/file");
const goods_1 = require("../actions/goods");
const customer_1 = require("../actions/customer");
exports.default = redux_1.combineReducers({
    login: login_1.default,
    taskCenter: task_center_1.default,
    Dict: dict_1.default,
    File: file_1.default,
    Goods: goods_1.default,
    Customer: customer_1.default
});
//# sourceMappingURL=index.js.map