import db from "Db";
import  User from "./user.model";
import  UserNumber from "./user-number.model";
import  Otp from "./otp.model";


User.hasMany(UserNumber, {foreignKey: 'userId'});
UserNumber.belongsTo(User, {foreignKey: 'userId'});


export {
    User,
    UserNumber,
    Otp
};