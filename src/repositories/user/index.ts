import User, { UserDocument } from '../../models/user/index';

/* ---------------- Create User ---------------- */
export const createUser = async (user: UserDocument): Promise<UserDocument> => {
   const newUser = await User.create(user);
   return newUser;
};

/* ---------------- Get User by ID ---------------- */
export const getUserById = async (id: string): Promise<UserDocument | null> => {
   const user = await User.findById(id).select('-password');
   return user;
};

/* ---------------- Get User by Email ---------------- */
export const getUserByEmail = async (
   email: string
): Promise<UserDocument | null> => {
   const user = await User.findOne({ email }).select('-password');
   return user;
};

/* ---------------- Get User by Username ---------------- */
export const getUserByUsername = async (
   username: string
): Promise<UserDocument | null> => {
   const user = await User.findOne({ username }).select('-password');
   return user;
};

/* ---------------- Update User ---------------- */
export const updateUser = async (
   id: string,
   user: UserDocument
): Promise<UserDocument | null> => {
   const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
   }).select('-password');
   return updatedUser;
};

/* ---------------- Delete User ---------------- */
export const deleteUser = async (id: string): Promise<boolean> => {
   return !!(await User.findByIdAndDelete(id));
};
