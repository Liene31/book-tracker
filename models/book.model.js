import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
    },

    rating: {
      type: Number,
      max: 5,
    },
    description: {
      type: String,
    },
    coverUrl: {
      type: String,
    },

    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "Book",
    timestamps: true,
  },
);

export const Book = model("Book", bookSchema);
