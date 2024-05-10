import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: 0 },
    // accountCreatedAt: { type: Date, default: Date.now },
  },
  // { timestamps: true }
);

// const Model_name = mongoose.model(" collection_name ",schemaType);
const UserModel = mongoose.model("User", userSchema);
export { UserModel as User };




/**
let currentDate = new Date();

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
if (day < 10) {
  day = '0' + day;
}
if (month < 10) {
  month = '0' + month;
}
let formattedDate = month + '/' + day + '/' + year;
console.log(formattedDate);
 */