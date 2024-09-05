
import { model , Schema} from "mongoose";

const bannerSchema = new Schema({
    imageUrl: String,
    targetScreen: String,
    active: Boolean,
  });
  
export const Banners = model('Banners', bannerSchema);