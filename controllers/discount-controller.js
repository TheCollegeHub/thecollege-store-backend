import { Discount } from "../models/discount";

export async function applyDiscount(req, res) {
// app.post('/applydiscount', async (req, res) => {
    const { code } = req.body;
    try {
      const discount = await Discount.findOne({ code });
      if (discount) {
        res.status(200).json({ discountPercentage: discount.percentage });
      } else {
        res.status(404).json({ message: 'Invalid discount code' });
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };