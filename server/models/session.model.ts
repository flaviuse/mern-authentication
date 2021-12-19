import { Schema, model, Document } from "mongoose";

interface SessionDocument extends Document {
  session: string;
  session_id: string;
  expire: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  session: String,
  session_id: String,
  expire: { type: Date, required: true, default: new Date(), expires: "14d" },
});

export const SessionModel = model<SessionDocument>("Session", sessionSchema);

export default SessionModel;
