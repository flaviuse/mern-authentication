import { model, Schema, Document } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export interface TokenDocument extends Document {
  _userId: typeof Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema = new Schema<TokenDocument>({
  _userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date(), expires: 43200 },
});

export const Token = model<TokenDocument>("Token", tokenSchema);

export default Token;
