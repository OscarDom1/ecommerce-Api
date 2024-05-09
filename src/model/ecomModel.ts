import mongoose from "mongoose";

interface EcomType {
  [key: string]: string | boolean | Array<string>;
}

const ecommSchema = new mongoose.Schema(
  {
    item_name: { type: String},
    category: { type: String },
    price: { type: String },
    no_of_item: { type: String },
    description: { type: String },
    pictures: [{ type: String}],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ecommerce = mongoose.model<EcomType>("ecommerce", ecommSchema);

export = Ecommerce;
