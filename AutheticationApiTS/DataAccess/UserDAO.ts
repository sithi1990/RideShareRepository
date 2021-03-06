﻿import mongoose = require("mongoose");
import IUserDAO = require("../common/IUserDAO");
import IUser = require("../models/common/IUser");
import User = require("../models/mongoose/UserMongooseModel");
import Config = require("../config");

class UserMongooseDAO implements IUserDAO
{
    onSelectedUserDataReceived: (error: Error, userData: IUser) => void ;
    onUserAdded: (error: Error, status: boolean) => void;
    constructor() {
        mongoose.connect(Config.database);
    }
    addUser(user: IUser)
    {
        // create a sample user
        var userModel = new User();
        userModel.userName = user.userName;
        userModel.firstName = user.firstName;
        userModel.lastName = user.lastName;
        userModel.email = user.email;
        userModel.password = user.password;

        var status: boolean;
        var self = this;
        // save the sample user
        userModel.save(function (err) {
            if (err) self.onUserAdded(err, null);

            self.onUserAdded(null, true);
        });
    }

    updateUser(user: IUser)
    {

    }

    getSelectedUser(userName: string)
    {
        var userData: IUser = new User();
        var self = this;
         User.findOne({userName: userName}, function (err, user) {

             if (err) self.onSelectedUserDataReceived(err, null);

             if (!user) {
                 self.onSelectedUserDataReceived(new Error("User not found."), null);
             } else if (user) {
                 userData.email = user.email;
                 userData.firstName = user.firstName;
                 userData.lastName = user.lastName;
                 userData.password = user.password;
                 userData.userName = user.userName;
                 self.onSelectedUserDataReceived(null, userData);
             }

         });
   
    }
}

export = UserMongooseDAO;