import connectDB from "../../middleware/mongoose";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    //console.log(req.body);
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      if (
        req.body.email === user.email &&
        req.body.forgotQues === user.forgotQues &&
        req.body.forgotAns === user.forgotAns
      ) {
        res.status(200).json({ success: true, res: user });
      } else {
        res.status(500).json({ success: false, error: "Invalid Credentials!" });
      }
    } else {
      res.status(500).json({ success: false, error: "User Does Not Exists!" });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ err: "This is bad request" });
  }
};

export default connectDB(handler);
