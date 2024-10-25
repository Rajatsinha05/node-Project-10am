const jwt = require("jsonwebtoken");

const decode = async (req, res, next) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      try {
        let data = await jwt.verify(token, "private-key");
        if (data) {
          req.user = data;
          next();
        }
      } catch (error) {
        res.status(404).json({ error: error });
      }
    } else {
      res.status(404).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { decode };
