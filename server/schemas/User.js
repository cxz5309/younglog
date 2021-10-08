import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

UserSchema.virtual('uid').get(function () {
  return this._id.toHexString();
});
UserSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('User', UserSchema);
