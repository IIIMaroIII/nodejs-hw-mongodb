import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    isFavourite: { type: Boolean, required: true, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactCollection = model('contact', contactSchema);
