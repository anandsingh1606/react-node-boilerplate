import User from "./user";
import UserNumber from "./user-number";
import Otp from "./otp";

User.hasMany(UserNumber, { foreignKey: "userId" });
UserNumber.belongsTo(User, { foreignKey: "userId", as: "userRef" });

export { User, UserNumber, Otp };
