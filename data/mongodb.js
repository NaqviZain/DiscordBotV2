import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
    ownerId : { type: String, required: true },
    vehicle: { type: Number, required: true },
    color: { type: Number, required: true },
    licensePlate: { type: String, required: true },
    date: { type: Number, default: Date.now() },
});

const ticketSchema = new Schema({
    recipient: { type: String, required: true },
    unitId: { type: String, required: true },
    charges: { type: String, required: true },
    fine: { type: Number, default: "" },
    date: { type: Number, default: Date.now() },
});

export const Vehicle = model("Vehicles", vehicleSchema);

export const ticket = model("Tickets", ticketSchema);