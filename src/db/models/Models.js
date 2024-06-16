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

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required!'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      ],
    },
    password: { type: String, required: [true, 'Password is required!'] },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Models = {
  ContactModel: model('contact', contactSchema),
  UserModel: model('users', userSchema),
  SessionModel: model('sessions', sessionSchema),
};
