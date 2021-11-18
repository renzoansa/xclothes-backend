import { model, Schema } from 'mongoose';

const clothingCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('ClothingCategory', clothingCategorySchema);
