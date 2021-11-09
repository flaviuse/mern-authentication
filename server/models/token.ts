import { model, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

type Token = {
  _userId: typeof Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
};

const tokenSchema = new Schema<Token>({
  _userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date(), expires: 43200 },
});

export const TokenModel = model<Token>("Token", tokenSchema);
