﻿import IUser = require("./common/IUser");
import BaseResponse = require("./common/BaseResponse");

class UserResponse extends BaseResponse{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
}

export = UserResponse;