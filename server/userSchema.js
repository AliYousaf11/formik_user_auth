const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let key = "asdfghjklpoiuytrewqzxcvbnmlpoiuytrewqasd";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  confirmpassword: {
    type: String,
    trim: true,
  },
  Gender: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  image: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  message: {
    type: String,
    require,
  },
});

userSchema.methods.generateAuthToken = async function (req, res) {
  try {
    //generate token...
    let token = jwt.sign({ _id: this._id }, key, {
      expiresIn: 10,
    });

    // set token to token arrry & return
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
    //.....
  } catch (error) {
    console.log(error);
  }
};
const userschema = mongoose.model("userschema", userSchema);
module.exports = userschema;
