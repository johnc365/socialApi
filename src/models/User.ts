import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_.+-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, 'Please use a valid email address'],
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

export default User;