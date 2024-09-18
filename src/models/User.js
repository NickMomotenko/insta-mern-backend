import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    nickname: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    passwordHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ id: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

export default User;
