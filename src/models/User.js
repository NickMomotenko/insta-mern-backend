import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      unique: true,
      required: true,
    },
    info: {
      type: String,
      default: "",
    },
    fullname: {
      type: String,
      default: "",
    },
    job: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    posts: {
      type: Array,
      default: [],
    },
    stories: {
      type: Array,
      default: [],
    },
    saved: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ id: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

export default User;
