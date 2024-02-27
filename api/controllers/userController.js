const User = require("../models/userModel");
const errorhandler = require("../utils/error");
const bcrypt = require("bcryptjs");
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userid) {
    return next(errorhandler(403, "You are not allowed to update other user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorhandler(400, "Password must be at least 6 characters long.")
      );
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorhandler(400, "Username must be between 7 and 20 characters long.")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorhandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorhandler(400, "Username must be Lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorhandler(400, "Username can only conatin letters and numbers.")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userid,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userid) {
    return next(errorhandler(403, "You are not allowed to delete this user."));
  }
  try {
    await User.findByIdAndDelete(req.params.userid);
    res.status(200).json("User has been Deleted");
  } catch (error) {
    next(error);
  }
};
const signOut=async(req,res,next)=>{
   try {
    res.clearCookie('access_token').status(200).json("User has been signed out")
   } catch (error) {
    next(error);
   }
}
module.exports = { updateUser, deleteUser,signOut};
