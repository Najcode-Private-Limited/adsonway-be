const bcrypt = require('bcrypt');

const comparePassword = async (password, hashedPassword) => {
   const isPasswordValid = await bcrypt.compare(password, hashedPassword);
   return isPasswordValid;
};

const hashPassword = async (password) => {
   const hashedPassword = await bcrypt.hash(password, 10);
   return hashedPassword;
};

module.exports = {
   comparePassword,
   hashPassword,
};
