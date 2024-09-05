import { model , Schema} from "mongoose";

export const Order = model("Order", {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    cartItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod: { type: Object, required: true },
    date: { type: Date, default: Date.now },
});


export const OrderV2 = model('ordersv2', {
    userId: String,
    status: String,
    totalAmount: Number,
    shippingCost: Number,
    taxCost: Number,
    orderDate: Date,
    paymentMethod: String,
    billingAddress: Object,
    shippingAddress: Object,
    deliveryDate: Date,
    items: Array,
    billingAddressSameAsShipping: Boolean,
  });