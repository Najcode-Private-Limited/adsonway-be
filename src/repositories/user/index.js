const user = require('../../models/user/index');
const User = require('../../models/user/index');

/* ---------------- Create User ---------------- */
const createUser = async (user) => {
   const newUser = await User.create(user);
   return newUser;
};

/* ---------------- Get User by ID ---------------- */
const getUserById = async (id) => {
   const user = await User.findById(id).select('-password');
   return user;
};

/* ---------------- Get User by Email ---------------- */
const getUserByEmail = async (email) => {
   const user = await User.findOne({ email }).select('-password');
   return user;
};

/* ---------------- Get Users by Role ---------------- */

const getUsersByRole = async (role) => {
   const users = await User.find({ role }).select('-password');
   return users;
};

/* ---------------- Get User by Username ---------------- */
const getUserByUsername = async (username) => {
   const user = await User.findOne({ username });
   return user;
};

/* ---------------- Update User ---------------- */
const updateUser = async (id, user) => {
   const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
   }).select('-password');
   return updatedUser;
};

/* ---------------- Delete User ---------------- */
const deleteUser = async (id) => {
   return !!(await User.findByIdAndDelete(id));
};

/* ---------------- Check Existing Instance ---------------- */
const checkExiststingInstance = async (username, email) => {
   const user = await User.findOne({
      $or: [{ username }, { email }],
   });
   return !!user;
};

/* ---------------- Get Users Created By Agent ---------------- */
const getUsersCreatedByAgent = async (agentId) => {
   const users = await User.find({ createdBy: agentId, role: 'user' })
      .select('-password')
      .populate('createdBy', 'username email full_name');
   return users;
};

const getAllUsers = async (query) => {
   const users = await User.find({ role: 'user', ...query }).select(
      '-password'
   );
   return users;
};

module.exports = {
   createUser,
   getUserById,
   getUserByEmail,
   getUserByUsername,
   updateUser,
   deleteUser,
   checkExiststingInstance,
   getUsersByRole,
   getUsersCreatedByAgent,
   getAllUsers,
};
