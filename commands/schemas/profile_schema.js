import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema({
  user_id: Number,
  citations: Array,
  vehicles: Array,
  license: Boolean,
  blacklisted: Boolean,
});

const Profile = model("Profile", profileSchema);
export default Profile;
