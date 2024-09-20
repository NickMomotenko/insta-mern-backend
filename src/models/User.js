import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "",
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      default: "",
      required: true,
    },
    passwordHash: {
      type: String,
      default: "",
      required: true,
    },
    nickname: {
      type: String,
      unique: true,
      default: "",
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

    // posts: {
    //   type: Array,
    //   default: [],
    // },
    // stories: {
    //   type: Array,
    //   default: [],
    // },
    // saved: {
    //   type: Array,
    //   default: [],
    // },
    // liked: {
    //   type: Array,
    //   default: [],
    // },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ id: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

export default User;
