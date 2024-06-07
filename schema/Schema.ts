import { Schema, Model } from "mongoose";
import mongoose from "mongoose";

export type ITrackerSchema = {
  date: Date;
  startTime?: Date;
  endTime?: Date;
};

const trackerSchema: Schema<ITrackerSchema> = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: Date, default: null },
  endTime: { type: Date, default: null },
});

let Tracker: Model<ITrackerSchema>;
if (mongoose.models.Tracker) {
  Tracker = mongoose.model<ITrackerSchema>("Tracker");
} else {
  Tracker = mongoose.model<ITrackerSchema>("Tracker", trackerSchema);
}

export { Tracker };
