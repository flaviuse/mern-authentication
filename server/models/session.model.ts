import { Schema, model, Document, Model } from "mongoose";

interface ISessionDocument extends Document {
  session: string;
  session_id: string;
  expire: Date;
}

interface ISessionInstance extends ISessionDocument {}

interface ISessionModel extends Model<ISessionInstance> {}

const sessionSchema = new Schema<ISessionDocument, ISessionModel, ISessionInstance>({
  session: String,
  session_id: String,
  expire: { type: Date, required: true, default: new Date(), expires: "14d" },
});

export const SessionModel: ISessionModel = model<ISessionInstance, ISessionModel>(
  "Session",
  sessionSchema
);
