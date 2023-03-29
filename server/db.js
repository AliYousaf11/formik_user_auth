const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://aliyousaf:lakerdouble@clustername.r6egydd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
