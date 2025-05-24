import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
    ownerId : { type: String, required: true },
    vehicle: { type: String, required: true },
    color: { type: String, required: true },
    licensePlate: { type: String, required: true },
    vehicleId: { type: Number, default: null },
    date: { type: Number, default: Date.now() },
});

const ticketSchema = new Schema({
    recipient: { type: String, required: true },
    officer: { type: String, required: true },
    charges: { type: String, required: true },
    fine: { type: Number, default: "" },
    case: { type: Number, default: null},
    date: { type: Number, default: Date.now() },
    report_num: { type: Number, default: null },
});

const modLog = new Schema({
  recipient: { type: String, required: true },
  moderator: { type: String, required: true },
  type: { type: String, required: true },
  reason: { type: String, required: true },
  evidence: { type: String, required: true },
  case: { type: Number, default: null},
  date: { type: Number, default: Date.now() },
  expires: { type: Date, default: null },
})

const economyProfile = new Schema({
  userId: { type: String, required: true },
  balance: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  inventory: { type: Array, default: [] },
  workCooldown: { type: Date, default: null},
  claimCooldown: { type: Date, default: null},
});

const jailedSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  date: { type: Number, default: Date.now() },
});

const strikeSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  strikes: { type: [String], default: [] }, // array of role IDs
  date: { type: Number, default: Date.now() },
});

const startupSessionSchema = new Schema({
  messageId: { type: String, required: true },
  channelId: { type: String, required: true },
  reactions: { type: [String], default: [] }, // user IDs who reacted
  createdAt: { type: Date, default: Date.now },
});

export const startupSessions = model("StartupSessions", startupSessionSchema);


export const strikes = model("Strikes", strikeSchema);


export const jailed = model("jailed", jailedSchema);

export const modlog = model("modLog", modLog);

export const vehicle = model("Vehicles", vehicleSchema);

export const ticket = model("Tickets", ticketSchema);

export const economy = model("Economy", economyProfile);