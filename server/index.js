const express = require("express");
const app = express();
const cors = require("cors");
const userschema = require("./userSchema");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

// middlware.....
app.use(cookieParser());
app.use(express.json());
app.use(cors());
require("./db");

//... signup....
app.post("/api/signup", async (req, res) => {
  const { name, email, password, confirmpassword, Gender, phone, image } =
    req.body;
  const emailExit = await userschema.findOne({ email: email });
  if (emailExit) {
    res.status(201).json({ message: "Email already allocated..." });
  } else {
    const hashpass = bcrypt.hashSync(password);
    const hashconfirmpassword = bcrypt.hashSync(confirmpassword);
    const user = await userschema({
      name,
      email,
      password: hashpass,
      confirmpassword: hashconfirmpassword,
      Gender,
      phone,
      image,
    });
    await user.save();
    res.status(200).json({ message: "Signup Successfullly..." });
  }
});

//....login.....
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const emailExit = await userschema.findOne({ email: email });
  if (emailExit) {
    //user image....
    const userImage = emailExit.image;
    const isMatch = bcrypt.compare(password, emailExit.password);

    // password ismatch with DB password.....
    if (isMatch) {
      // generate token...
      const token = await emailExit.generateAuthToken();

      // cokkies....
      res.cookie("auth", token, {
        expiresIn: 60,
        httpOnly: true,
      });

      // send cookie to client-side....
      const result = {
        token,
        emailExit,
        userImage,
      };
      res.status(200).json({
        userImage: userImage,
        message: "login Successfullly...",
        result,
      });
    } else {
      res.status(200).json({ message: "password not match..." });
    }
  } else {
    res.status(404).json({ message: "Email Not Found..." });
  }
});

app.listen(5000, () => {
  console.log(`server start at 5000`);
});
