import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../../utils/handleMongooseError.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required!'] },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required!'],
    },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
    },
  },
  { timestamps: true, versionKey: false },
);

contactSchema.post('save', handleMongooseError);

export const ContactCollection = model('contact', contactSchema);
