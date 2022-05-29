import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === "POST") {
    //console.log(req.body);
    const { name, email, role, forgetQues, forgetAns } = req.body;
    let newUser = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_ENCRYPT ).toString(),
      role,
      forgetQues,
      forgetAns,
    });
    await newUser.save();
    res.status(200).json({ res: newUser,success:true });
  } else {
    // Handle any other HTTP method
    res.status(400).json({ err: "This is bad request",success:false });
  }
};

export default connectDB(handler);
