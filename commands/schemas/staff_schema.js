import mongoose from "mongoose";
const { Schema, model } = mongoose;

const staff = new Schema({
    staff_id: Number, 
    sessions: Array, 
    strikes: Number, 
    hired: String, 
});

const Staff = model("Staff", staff);
export default Staff;
