import { model, Schema } from 'mongoose';
import moment from 'moment';

export const refreshTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  revocationDate: Date,
  replacementToken: String,
});

class RefreshToken {
  get isExpired() {
    return moment().isSameOrAfter(moment(this.expirationDate));
  }
}

refreshTokenSchema.loadClass(RefreshToken);

export default model('RefreshToken', refreshTokenSchema);
