import mongoose, { Schema, models, model } from "mongoose";

const linkSchema = new Schema({
  userId: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clickCount: { type: Number, default: 0 },
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      ip: String,
      userAgent: String,
    },
  ],
},{timestamps:true});


export const Link=models.Link || model("Link",linkSchema)
