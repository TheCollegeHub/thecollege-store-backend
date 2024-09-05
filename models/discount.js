import { model , Schema} from "mongoose";

const discountSchema = new Schema({
    code: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true }
  });
  
export const Discount = model('Discount', discountSchema);