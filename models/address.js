import { model , Schema} from "mongoose";

// Schema para endereços dos usuários
export const Address = model("Address", {
  userId: { type: Schema.Types.ObjectId, ref: 'Users' },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const addressSchema = new Schema({
    userId: { type: String, required: true },
    name: String,
    phoneNumber: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    dateTime: { type: Date, default: Date.now },
    selectedAddress: { type: Boolean, default: true },
  });
  
export const AddressV2 = model('addressesv2', addressSchema);