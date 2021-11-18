import { model, Schema } from 'mongoose';

const invoiceSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  paymentMethodId: {
    type: String,
    required: true,
  },
});

export default model('Invoice', invoiceSchema);
