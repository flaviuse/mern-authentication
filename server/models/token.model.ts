import { model, Schema, Document, Model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

interface ITokenDocument extends Document {
  _userId: typeof Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

interface ITokenInstance extends ITokenDocument {}

export interface ITokenModel extends Model<ITokenInstance> {}

const tokenSchema = new Schema<ITokenDocument, ITokenModel, ITokenInstance>({
  _userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date(), expires: 43200 },
});

export const Token: ITokenModel = model<ITokenInstance, ITokenModel>("Token", tokenSchema);

export default Token;
