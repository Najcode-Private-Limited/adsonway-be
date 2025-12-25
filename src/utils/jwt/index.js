const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

/* ---------------- Sign Token Function ---------------- */
const signToken = (payload) => {
   return jwt.sign(payload, JWT_SECRET);
};

/* ---------------- Verify Token Function ---------------- */
const verifyToken = (token) => {
   return jwt.verify(token, JWT_SECRET);
};

module.exports = {
   signToken,
   verifyToken,
};
