import { model, Schema } from 'mongoose';

const clothingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  priceInDollarCents: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ClothingCategory',
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
});

export default model('Clothing', clothingSchema);
