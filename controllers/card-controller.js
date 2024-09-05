import { Card } from "../models/card"


export async function createUserCard(req, res) {
// app.post('/api/user/:userId/cards', fetchuser, async (req, res) => {
    const { userId } = req.params;
  
    const { cardNumber, expiryDate, cvv } = req.body;
  
    const newCard = new Card({
      userId,
      cardNumber,
      expiryDate,
      cvv,
    });
  
    try {
      const savedCard = await newCard.save();
      res.json({ success: true, card: savedCard });
    } catch (error) {
      console.error('Error saving card:', error);
      res.status(500).json({ success: false, errors: 'Internal server error' });
    }
  };
  
  export async function getAllCardsByUserId(req, res) {
//   app.get('/api/user/:userId/cards', fetchuser, async (req, res) => {
    const { userId } = req.params;
    try {
      const cards = await Card.find({ userId });
      res.json(cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
      res.status(500).json({ success: false, errors: 'Internal server error' });
    }
  };