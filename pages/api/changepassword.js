import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
 //console.log("before post = ",req.body)
  if (req.method === "PUT") {
    console.log(req.body);

    //const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_ENCRYPT );
    //const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (req.body.newPassword !== req.body.confmNewPassword) {
      res
        .status(400)
        .json({ success: false, error: "Password Does not Match!" });
    }

    //console.log("Before = ", user.password);
    let user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.AES_ENCRYPT
          ).toString(),
        },
      },
      { returnOriginal: false }
    );
    console.log("After = ", user.password);

    if (user) {
      let authToken = jwt.sign(
        { name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );
      res.status(200).json({ success: true, authToken: authToken, res: user });
    } else {
      res.status(500).json({ success: false, error: "User Does Not Exists!" });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ err: "This is bad request" });
  }
};

export default connectDB(handler);
