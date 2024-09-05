import { model , Schema} from "mongoose";

const CategorySchema = new Schema({
    name: String,
    image: String,
    parentId: String,
    isFeatured: Boolean,
  });
  
export const Category = model('Category', CategorySchema);
  