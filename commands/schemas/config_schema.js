import mongoose from "mongoose";
const { Schema, model } = mongoose;

const config = new Schema({
    config: String, 
    reports_channel: String,
    log_channel: String,

});

const Config = model("Config", config);
export default Config;
