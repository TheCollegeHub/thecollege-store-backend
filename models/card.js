import { model , Schema} from "mongoose";

const CardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  });
  
export const Card = model('Card', CardSchema);