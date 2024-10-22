const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connect to the database");
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
