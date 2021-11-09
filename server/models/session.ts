import { Schema, model } from "mongoose";

type Session = {
  session: string;
  session_id: string;
  expire: Date;
};

const sessionSchema = new Schema<Session>({
  session: String,
  session_id: String,
  expire: { type: Date, required: true, default: new Date(), expires: "14d" },
});

export const SessionModel = model<Session>("Session", sessionSchema);
